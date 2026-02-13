import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export * from "./models/auth";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  registrationLink: text("registration_link"),
  displayOrder: serial("display_order"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const smsConsents = pgTable("sms_consents", {
  id: serial("id").primaryKey(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSmsConsentSchema = createInsertSchema(smsConsents).omit({
  id: true,
  createdAt: true,
});

export type InsertSmsConsent = z.infer<typeof insertSmsConsentSchema>;
export type SmsConsent = typeof smsConsents.$inferSelect;

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  displayOrder: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
