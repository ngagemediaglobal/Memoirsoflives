import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { contributorsTable } from "./contributors";

export const memoirsTable = pgTable("memoirs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  fullStory: text("full_story").notNull(),
  subjectName: text("subject_name").notNull(),
  subjectAge: integer("subject_age"),
  subjectTitle: text("subject_title"),
  category: text("category").notNull(),
  featured: boolean("featured").notNull().default(false),
  imageUrl: text("image_url"),
  contributorId: integer("contributor_id").references(() => contributorsTable.id),
  readTimeMinutes: integer("read_time_minutes").notNull().default(5),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertMemoirSchema = createInsertSchema(memoirsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertMemoir = z.infer<typeof insertMemoirSchema>;
export type Memoir = typeof memoirsTable.$inferSelect;
