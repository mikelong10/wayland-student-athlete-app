import type { users } from "./schema/auth";
import type {
  jobReviewImages,
  jobReviews,
  studentAthleteProfiles,
  studentAthleteResumeItems,
} from "./schema/content";
import type { jobs } from "./schema/jobs";

export type User = typeof users.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type JobReview = typeof jobReviews.$inferSelect;
export type JobReviewImage = typeof jobReviewImages.$inferSelect;
export type StudentAthleteProfile = typeof studentAthleteProfiles.$inferSelect;
export type StudentAthleteResumeItem =
  typeof studentAthleteResumeItems.$inferSelect;

export type JobReviewWithImages = {
  review: JobReview;
  images: JobReviewImage[];
};

export type StudentAthleteProfileWithResume = {
  profile: StudentAthleteProfile;
  resume: StudentAthleteResumeItem[];
};
