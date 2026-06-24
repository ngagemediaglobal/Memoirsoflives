import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";

export const newsletterSubscribersTable = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  confirmed: boolean("confirmed").notNull().default(false),
  subscribedAt: timestamp("subscribed_at").notNull().defaultNow(),
});

export type NewsletterSubscriber = typeof newsletterSubscribersTable.$inferSelect;
