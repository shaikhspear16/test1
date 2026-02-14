import { db } from "./db";
import { events } from "@shared/schema";
import { like } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { ObjectStorageService } from "./replit_integrations/object_storage/objectStorage";
import fs from "fs";
import path from "path";

export async function migrateUploadsToObjectStorage() {
  try {
    const oldEvents = await db
      .select()
      .from(events)
      .where(like(events.imageUrl, "/uploads/%"));

    if (oldEvents.length === 0) {
      return;
    }

    console.log(`[migrate] Found ${oldEvents.length} events with old /uploads/ paths, migrating to App Storage...`);

    const storageService = new ObjectStorageService();
    const uploadsDir = path.join(process.cwd(), "uploads");

    for (const event of oldEvents) {
      const filename = path.basename(event.imageUrl);
      const localPath = path.join(uploadsDir, filename);

      if (!fs.existsSync(localPath)) {
        console.log(`[migrate] Event ${event.id}: local file not found (${filename}), skipping`);
        continue;
      }

      const uploadURL = await storageService.getObjectEntityUploadURL();
      const objectPath = storageService.normalizeObjectEntityPath(uploadURL);

      const fileBuffer = fs.readFileSync(localPath);
      const ext = path.extname(filename).toLowerCase();
      const contentTypeMap: Record<string, string> = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp",
      };
      const contentType = contentTypeMap[ext] || "application/octet-stream";

      const response = await fetch(uploadURL, {
        method: "PUT",
        body: fileBuffer,
        headers: { "Content-Type": contentType },
      });

      if (!response.ok) {
        console.error(`[migrate] Failed to upload event ${event.id}: HTTP ${response.status}`);
        continue;
      }

      await db
        .update(events)
        .set({ imageUrl: objectPath })
        .where(eq(events.id, event.id));

      console.log(`[migrate] Event ${event.id}: migrated to ${objectPath}`);
    }

    console.log(`[migrate] Image migration complete`);
  } catch (error) {
    console.error("[migrate] Error during image migration:", error);
  }
}
