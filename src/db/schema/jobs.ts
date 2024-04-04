import { users } from "@db/schema/auth";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

export const jobs = sqliteTable("job", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuid()),
  status: text("status", { enum: ["todo", "in_progress", "done"] })
    .notNull()
    .default("todo"),
  adultFirstName: text("adult_first_name").notNull(),
  adultLastName: text("adult_last_name").notNull(),
  childFirstName: text("child_first_name"),
  childLastName: text("child_last_name"),
  description: text("description").notNull(),
  location: text("location").notNull(),
  time: text("time").notNull(),
  estimate: text("estimate").notNull(),
  contact: text("contact").notNull(),
  learn: text("learn"),
  special: text("special"),
  signature: text("signature").notNull(),
  requestorId: text("requestor_id").references(() => users.id, {
    onDelete: "cascade",
  }),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const jobAssignments = sqliteTable("jobAssignment", {
  jobId: text("job_id")
    .notNull()
    .references(() => jobs.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  assignedAt: text("assigned_at").default(sql`(CURRENT_TIMESTAMP)`),
  assignedBy: text("assigned_by").notNull(),
});
