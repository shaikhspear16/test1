import express, { type Express, type RequestHandler } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";
import { insertEventSchema, insertSmsConsentSchema, insertNewsletterSignupSchema } from "@shared/schema";
import { getPrayerTimes, startPrayerTimesRefresh } from "./prayerTimes";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";
import { setupAuth, isAuthenticated, getUserEmail } from "./replitAuth";
import { insertAdminAllowlistSchema } from "@shared/schema";
import path from "path";

const csrfProtection: RequestHandler = (req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }
  const origin = req.headers.origin || req.headers.referer;
  if (!origin) {
    return res.status(403).json({ message: "Missing origin" });
  }
  try {
    const originHost = new URL(origin).host;
    if (originHost !== req.headers.host) {
      return res.status(403).json({ message: "Cross-origin request rejected" });
    }
  } catch {
    return res.status(403).json({ message: "Invalid origin" });
  }
  next();
};

const isAdmin: RequestHandler = async (req, res, next) => {
  const email = getUserEmail(req);
  if (!email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const allowed = await storage.isEmailAllowlisted(email);
    if (!allowed) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    console.error("Error checking admin allowlist:", error);
    res.status(500).json({ message: "Failed to verify admin access" });
  }
};

async function seedAllowlist() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const seedEmails = [
    ...(adminEmail ? [adminEmail] : []),
    "musababdullah6231@gmail.com",
    "tahir.khan@gicmasjid.org",
  ];
  try {
    for (const email of seedEmails) {
      await storage.addToAllowlist(email);
    }
    console.log("Admin allowlist seeded");
  } catch (error) {
    console.error("Failed to seed admin allowlist:", error);
  }
}

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

  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET must be set");
  }

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
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

  const uploadsDir = path.join(process.cwd(), "uploads");
  app.use("/uploads", (req, res, next) => {
    res.set("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  }, express.static(uploadsDir));

  registerObjectStorageRoutes(app);

  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(
      `User-agent: *\nAllow: /\n\nSitemap: https://gic-modernizer--musababdullah.replit.app/sitemap.xml\n`
    );
  });

  startPrayerTimesRefresh();

  await setupAuth(app);
  await seedAllowlist();

  app.use("/api/admin", csrfProtection);

  app.get("/api/auth/me", isAuthenticated, (req, res) => {
    const email = getUserEmail(req);
    if (!email) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({ email });
  });

  app.get("/api/admin/allowlist", isAuthenticated, isAdmin, async (_req, res) => {
    try {
      const list = await storage.getAllowlist();
      res.json(list);
    } catch (error) {
      console.error("Error fetching allowlist:", error);
      res.status(500).json({ message: "Failed to fetch allowlist" });
    }
  });

  app.post("/api/admin/allowlist", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const parsed = insertAdminAllowlistSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "A valid email is required" });
      }
      const entry = await storage.addToAllowlist(parsed.data.email);
      res.status(201).json(entry);
    } catch (error) {
      console.error("Error adding to allowlist:", error);
      res.status(500).json({ message: "Failed to add admin" });
    }
  });

  app.delete("/api/admin/allowlist/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const list = await storage.getAllowlist();
      if (list.length <= 1) {
        return res.status(400).json({ message: "Cannot remove the last admin" });
      }
      const entry = list.find((e) => e.id === id);
      if (!entry) {
        return res.status(404).json({ message: "Admin not found" });
      }
      const currentEmail = getUserEmail(req);
      if (entry.email === currentEmail) {
        return res.status(400).json({ message: "You cannot remove yourself" });
      }
      await storage.removeFromAllowlist(id);
      res.json({ message: "Admin removed" });
    } catch (error) {
      console.error("Error removing from allowlist:", error);
      res.status(500).json({ message: "Failed to remove admin" });
    }
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

      const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
      const MAILCHIMP_LIST_ID = "6f4281f9d5";
      const MAILCHIMP_DC = "us14";

      if (!MAILCHIMP_API_KEY) {
        console.error("MAILCHIMP_API_KEY not configured");
        return res.status(201).json({ message: "Thank you for subscribing!" });
      }

      const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() || req.socket.remoteAddress || "";
      const now = new Date();
      const timestamp = now.toISOString().replace("T", " ").replace(/\.\d{3}Z$/, "");

      try {
        const mailchimpRes = await fetch(
          `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64")}`,
            },
            body: JSON.stringify({
              email_address: parsed.data.email,
              email_type: "html",
              status: "subscribed",
              ip_signup: ip,
              timestamp_signup: timestamp,
            }),
          }
        );

        if (!mailchimpRes.ok) {
          const errBody = await mailchimpRes.json().catch(() => ({}));
          if ((errBody as any)?.title === "Member Exists") {
            return res.status(200).json({ message: "You're already subscribed!" });
          }
          console.error("Mailchimp API error:", errBody);
        }
      } catch (mailchimpErr) {
        console.error("Mailchimp request failed:", mailchimpErr);
      }

      res.status(201).json({ message: "Thank you for subscribing!" });
    } catch (error) {
      console.error("Error saving newsletter signup:", error);
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });

  app.post("/api/admin/events", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { title, description, imageUrl, registrationLink, registrationLinkText } = req.body;

      if (!imageUrl) {
        return res.status(400).json({ message: "Image is required" });
      }

      const eventData = {
        title: title || null,
        description: description || null,
        imageUrl,
        registrationLink: registrationLink || null,
        registrationLinkText: registrationLinkText || "Register Now",
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

  app.patch("/api/admin/events/:id", isAuthenticated, isAdmin, async (req, res) => {
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

      if (req.body.imageUrl) {
        updateData.imageUrl = req.body.imageUrl;
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

  app.post("/api/admin/migrate-images", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const allEvents = await storage.getEvents();
      const storageService = new (await import("./replit_integrations/object_storage/objectStorage")).ObjectStorageService();
      const fs = await import("fs");
      const pathMod = await import("path");
      const uploadsDir = pathMod.default.join(process.cwd(), "uploads");
      let migrated = 0;

      for (const event of allEvents) {
        if (!event.imageUrl || !event.imageUrl.startsWith("/uploads/")) continue;

        const filename = pathMod.default.basename(event.imageUrl);
        const localPath = pathMod.default.join(uploadsDir, filename);

        if (!fs.default.existsSync(localPath)) {
          console.log(`[migrate] Event ${event.id}: file not found (${filename})`);
          continue;
        }

        const uploadURL = await storageService.getObjectEntityUploadURL();
        const objectPath = storageService.normalizeObjectEntityPath(uploadURL);

        const fileBuffer = fs.default.readFileSync(localPath);
        const ext = pathMod.default.extname(filename).toLowerCase();
        const ctMap: Record<string, string> = {
          ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
          ".png": "image/png", ".gif": "image/gif", ".webp": "image/webp",
        };

        const response = await fetch(uploadURL, {
          method: "PUT",
          body: fileBuffer,
          headers: { "Content-Type": ctMap[ext] || "application/octet-stream" },
        });

        if (!response.ok) continue;

        await storage.updateEvent(event.id, { imageUrl: objectPath });
        migrated++;
        console.log(`[migrate] Event ${event.id}: migrated to ${objectPath}`);
      }

      res.json({ message: `Migrated ${migrated} images to cloud storage` });
    } catch (error) {
      console.error("Error migrating images:", error);
      res.status(500).json({ message: "Failed to migrate images" });
    }
  });

  return httpServer;
}
