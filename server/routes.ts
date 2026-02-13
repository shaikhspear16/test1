import express, { type Express, type RequestHandler } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import { insertEventSchema, insertSmsConsentSchema } from "@shared/schema";
import { getPrayerTimes, startPrayerTimesRefresh } from "./prayerTimes";
import multer from "multer";
import path from "path";
import fs from "fs";

const ALLOWED_ADMIN_DOMAIN = "@gicmasjid.org";

const isAdmin: RequestHandler = async (req, res, next) => {
  const user = req.user as any;
  
  if (!user?.claims?.email) {
    return res.status(403).json({ message: "Access denied: No email found" });
  }
  
  const email = (user.claims.email as string).toLowerCase();

  const adminRecord = await storage.getAdminUserByEmail(email);
  if (adminRecord?.isBanned) {
    return res.status(403).json({ message: "Access denied: Your account has been banned" });
  }

  const isDomainAdmin = email.endsWith(ALLOWED_ADMIN_DOMAIN);
  const isWhitelisted = adminRecord?.isWhitelisted === true;

  if (!isDomainAdmin && !isWhitelisted) {
    return res.status(403).json({ 
      message: `Access denied: Only ${ALLOWED_ADMIN_DOMAIN} accounts or whitelisted users can access admin features` 
    });
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
  await setupAuth(app);
  registerAuthRoutes(app);

  app.use("/uploads", (req, res, next) => {
    res.set("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  }, express.static(uploadsDir));

  startPrayerTimesRefresh();

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

  app.get("/api/admin/check", isAuthenticated, isAdmin, (req, res) => {
    res.json({ isAdmin: true });
  });

  app.get("/api/admin/users", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const users = await storage.getAdminUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching admin users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.post("/api/admin/users", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { email, displayName } = req.body;
      if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ message: "A valid email address is required" });
      }

      const existing = await storage.getAdminUserByEmail(email);
      if (existing) {
        return res.status(409).json({ message: "This email is already in the admin users list" });
      }

      const user = await storage.createAdminUser({
        email: email.trim(),
        displayName: displayName?.trim() || null,
        isBanned: false,
        isWhitelisted: true,
      });
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating admin user:", error);
      res.status(500).json({ message: "Failed to add user" });
    }
  });

  app.patch("/api/admin/users/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const { isBanned, isWhitelisted, displayName } = req.body;

      const updateData: Record<string, any> = {};
      if (typeof isBanned === "boolean") updateData.isBanned = isBanned;
      if (typeof isWhitelisted === "boolean") updateData.isWhitelisted = isWhitelisted;
      if (typeof displayName === "string") updateData.displayName = displayName.trim() || null;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No valid update data provided" });
      }

      const user = await storage.updateAdminUser(id, updateData);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error updating admin user:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  app.delete("/api/admin/users/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const deleted = await storage.deleteAdminUser(id);
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User removed successfully" });
    } catch (error) {
      console.error("Error deleting admin user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  return httpServer;
}
