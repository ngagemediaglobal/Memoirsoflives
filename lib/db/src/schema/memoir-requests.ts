import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";

export const memoirRequestsTable = pgTable("memoir_requests", {
  id: serial("id").primaryKey(),
  subjectName: text("subject_name").notNull(),
  subjectAge: integer("subject_age"),
  milestone: text("milestone"),
  relationship: text("relationship").notNull(),
  storyNotes: text("story_notes").notNull(),
  package: text("package").notNull().default("standard"),
  requesterName: text("requester_name").notNull(),
  requesterEmail: text("requester_email").notNull(),
  requesterPhone: text("requester_phone"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type MemoirRequest = typeof memoirRequestsTable.$inferSelect;
