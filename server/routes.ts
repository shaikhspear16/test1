import express, { type Express, type RequestHandler } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";
import { insertEventSchema, insertSmsConsentSchema, insertNewsletterSignupSchema } from "@shared/schema";
import { getPrayerTimes, startPrayerTimesRefresh } from "./prayerTimes";
import multer from "multer";
import path from "path";
import fs from "fs";

declare module "express-session" {
  interface SessionData {
    adminEmail?: string;
  }
}

const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.session?.adminEmail) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

const isAdmin: RequestHandler = (req, res, next) => {
  const email = req.session?.adminEmail;
  if (!email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (email !== adminEmail) {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed"));
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "gic-admin-secret-key",
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      proxy: true,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: sessionTtl,
      },
    })
  );

  app.use("/uploads", (req, res, next) => {
    res.set("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  }, express.static(uploadsDir));

  startPrayerTimesRefresh();

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return res.status(500).json({ message: "Admin credentials not configured" });
    }

    if (email.toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    req.session.adminEmail = email.toLowerCase();
    res.json({ email: email.toLowerCase() });
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (!req.session?.adminEmail) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({ email: req.session.adminEmail });
  });

  app.get("/api/prayer-times", async (req, res) => {
    try {
      const prayers = await getPrayerTimes();
      res.json(prayers);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      res.status(500).json({ message: "Failed to fetch prayer times" });
    }
  });

  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  app.post("/api/sms-consent", async (req, res) => {
    try {
      const parsed = insertSmsConsentSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "A valid phone number is required" });
      }
      const consent = await storage.createSmsConsent(parsed.data);
      res.status(201).json({ message: "Thank you for signing up for SMS alerts!" });
    } catch (error) {
      console.error("Error saving SMS consent:", error);
      res.status(500).json({ message: "Failed to save consent" });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const parsed = insertNewsletterSignupSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "A valid email is required" });
      }
      await storage.createNewsletterSignup(parsed.data);
      res.status(201).json({ message: "Thank you for subscribing!" });
    } catch (error) {
      console.error("Error saving newsletter signup:", error);
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });

  app.post("/api/admin/events", isAuthenticated, isAdmin, upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      const eventData = {
        title: req.body.title || null,
        description: req.body.description || null,
        imageUrl: `/uploads/${req.file.filename}`,
        registrationLink: req.body.registrationLink || null,
        registrationLinkText: req.body.registrationLinkText || "Register Now",
      };

      const parseResult = insertEventSchema.safeParse(eventData);
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid event data", errors: parseResult.error.errors });
      }

      const event = await storage.createEvent(parseResult.data);
      res.status(201).json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Failed to create event" });
    }
  });

  app.patch("/api/admin/events/:id", isAuthenticated, isAdmin, upload.single("image"), async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const existingEvent = await storage.getEvent(id);

      if (!existingEvent) {
        return res.status(404).json({ message: "Event not found" });
      }

      const updateData: Partial<{
        title: string | null;
        description: string | null;
        registrationLink: string | null;
        registrationLinkText: string | null;
        imageUrl: string;
      }> = {};

      if (req.body.title !== undefined) {
        updateData.title = typeof req.body.title === "string" && req.body.title.trim()
          ? req.body.title.trim()
          : null;
      }
      if (req.body.description !== undefined) {
        updateData.description = typeof req.body.description === "string" && req.body.description.trim()
          ? req.body.description.trim()
          : null;
      }
      if (req.body.registrationLink !== undefined) {
        updateData.registrationLink = typeof req.body.registrationLink === "string" && req.body.registrationLink.trim()
          ? req.body.registrationLink.trim()
          : null;
      }
      if (req.body.registrationLinkText !== undefined) {
        updateData.registrationLinkText = typeof req.body.registrationLinkText === "string" && req.body.registrationLinkText.trim()
          ? req.body.registrationLinkText.trim()
          : "Register Now";
      }

      if (req.file) {
        updateData.imageUrl = `/uploads/${req.file.filename}`;
        if (existingEvent.imageUrl && existingEvent.imageUrl.startsWith("/uploads/")) {
          const oldPath = path.join(uploadsDir, path.basename(existingEvent.imageUrl));
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No valid update data provided" });
      }

      const event = await storage.updateEvent(id, updateData);
      res.json(event);
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ message: "Failed to update event" });
    }
  });

  app.delete("/api/admin/events/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const existingEvent = await storage.getEvent(id);

      if (!existingEvent) {
        return res.status(404).json({ message: "Event not found" });
      }

      if (existingEvent.imageUrl && existingEvent.imageUrl.startsWith("/uploads/")) {
        const imagePath = path.join(uploadsDir, path.basename(existingEvent.imageUrl));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await storage.deleteEvent(id);
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ message: "Failed to delete event" });
    }
  });

  app.put("/api/admin/events/reorder", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { orderedIds } = req.body;
      if (!Array.isArray(orderedIds) || orderedIds.some((id: any) => typeof id !== "number")) {
        return res.status(400).json({ message: "orderedIds must be an array of numbers" });
      }
      await storage.reorderEvents(orderedIds);
      res.json({ message: "Events reordered successfully" });
    } catch (error) {
      console.error("Error reordering events:", error);
      res.status(500).json({ message: "Failed to reorder events" });
    }
  });

  app.get("/api/admin/check", isAuthenticated, isAdmin, (req, res) => {
    res.json({ isAdmin: true });
  });

  app.post("/api/admin/seed-events", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const existing = await storage.getEvents();
      if (existing.length > 0) {
        return res.status(400).json({ message: "Events already exist, skipping seed" });
      }
      const { events: seedEvents } = req.body;
      if (!Array.isArray(seedEvents)) {
        return res.status(400).json({ message: "events array required" });
      }
      for (const ev of seedEvents) {
        await storage.createEvent({
          title: ev.title || null,
          description: ev.description || null,
          imageUrl: ev.imageUrl,
          registrationLink: ev.registrationLink || null,
          registrationLinkText: ev.registrationLinkText || "Register Now",
        });
      }
      res.json({ message: `Seeded ${seedEvents.length} events` });
    } catch (error) {
      console.error("Error seeding events:", error);
      res.status(500).json({ message: "Failed to seed events" });
    }
  });

  return httpServer;
}
