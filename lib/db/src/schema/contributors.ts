import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const contributorsTable = pgTable("contributors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  memoirCount: integer("memoir_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContributorSchema = createInsertSchema(contributorsTable).omit({ id: true, memoirCount: true, createdAt: true });
export type InsertContributor = z.infer<typeof insertContributorSchema>;
export type Contributor = typeof contributorsTable.$inferSelect;
