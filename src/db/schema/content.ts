import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

export const studentAthleteProfiles = sqliteTable("studentAthleteProfile", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuid()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  graduationYear: integer("graduation_year", { mode: "number" }).notNull(),
  displayImage: text("display_image").notNull(),
});

export const studentAthleteResumeItems = sqliteTable(
  "studentAthleteResumeItem",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => uuid()),
    text: text("text").notNull(),
    studentAthleteId: text("student_athlete_id")
      .notNull()
      .references(() => studentAthleteProfiles.id, { onDelete: "cascade" }),
  }
);

export const jobReviews = sqliteTable("jobReview", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuid()),
  reviewerName: text("reviewer_name").notNull(),
  reviewBlurb: text("review_blurb").notNull(),
  reviewText: text("review_text").notNull(),
  order: integer("order", { mode: "number" }).notNull(),
});

export const jobReviewImages = sqliteTable("jobReviewImage", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuid()),
  src: text("src").notNull().unique(),
  alt: text("alt").notNull(),
  width: integer("width", { mode: "number" }).notNull().default(800),
  height: integer("height", { mode: "number" }).notNull().default(800),
  jobReviewId: text("job_review_id")
    .notNull()
    .references(() => jobReviews.id, { onDelete: "cascade" }),
});
