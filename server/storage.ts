import { events, smsConsents, adminUsers, newsletterSignups, type Event, type InsertEvent, type SmsConsent, type InsertSmsConsent, type AdminUser, type InsertAdminUser, type NewsletterSignup, type InsertNewsletterSignup } from "@shared/schema";
import { db } from "./db";
import { eq, asc, sql } from "drizzle-orm";

export interface IStorage {
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;
  reorderEvents(orderedIds: number[]): Promise<void>;
  createSmsConsent(consent: InsertSmsConsent): Promise<SmsConsent>;
  getAdminUsers(): Promise<AdminUser[]>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  updateAdminUser(id: number, data: Partial<InsertAdminUser>): Promise<AdminUser | undefined>;
  deleteAdminUser(id: number): Promise<boolean>;
  createNewsletterSignup(signup: InsertNewsletterSignup): Promise<NewsletterSignup>;
}

export class DatabaseStorage implements IStorage {
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(asc(events.displayOrder));
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db
      .insert(events)
      .values(insertEvent)
      .returning();
    return event;
  }

  async updateEvent(id: number, updateData: Partial<InsertEvent>): Promise<Event | undefined> {
    const [event] = await db
      .update(events)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(events.id, id))
      .returning();
    return event;
  }

  async deleteEvent(id: number): Promise<boolean> {
    const result = await db.delete(events).where(eq(events.id, id)).returning();
    return result.length > 0;
  }

  async reorderEvents(orderedIds: number[]): Promise<void> {
    for (let i = 0; i < orderedIds.length; i++) {
      await db
        .update(events)
        .set({ displayOrder: i + 1 })
        .where(eq(events.id, orderedIds[i]));
    }
  }

  async createSmsConsent(consent: InsertSmsConsent): Promise<SmsConsent> {
    const [result] = await db.insert(smsConsents).values(consent).returning();
    return result;
  }

  async getAdminUsers(): Promise<AdminUser[]> {
    return await db.select().from(adminUsers).orderBy(asc(adminUsers.id));
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email.toLowerCase()));
    return user;
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const [result] = await db.insert(adminUsers).values({ ...user, email: user.email.toLowerCase() }).returning();
    return result;
  }

  async updateAdminUser(id: number, data: Partial<InsertAdminUser>): Promise<AdminUser | undefined> {
    const [result] = await db.update(adminUsers).set(data).where(eq(adminUsers.id, id)).returning();
    return result;
  }

  async deleteAdminUser(id: number): Promise<boolean> {
    const result = await db.delete(adminUsers).where(eq(adminUsers.id, id)).returning();
    return result.length > 0;
  }

  async createNewsletterSignup(signup: InsertNewsletterSignup): Promise<NewsletterSignup> {
    const [result] = await db.insert(newsletterSignups).values(signup).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
