import { db } from "@db";
import { jobAssignments, jobs } from "@db/schema/jobs";
import { and, desc, eq, or } from "drizzle-orm";

import { Role, Status } from "@lib/enums";
import { users } from "./schema/auth";
import {
  jobReviewImages,
  jobReviews,
  studentAthleteProfiles,
  studentAthleteResumeItems,
} from "./schema/content";
import {
  Job,
  JobReviewWithImages,
  StudentAthleteProfileWithResume,
  User,
} from "./types";

export const getUsersByRole = async (...roles: Role[]) => {
  const usersByRole = await db
    .select()
    .from(users)
    .where(or(...roles.map((role) => eq(users.role, role))))
    .orderBy(desc(users.createdAt));
  return usersByRole;
};

export const getJobsByStatus = async (status: Status) => {
  const jobsByStatus = await db
    .select()
    .from(jobAssignments)
    .rightJoin(jobs, eq(jobAssignments.jobId, jobs.id))
    .leftJoin(users, eq(jobAssignments.userId, users.id))
    .where(eq(jobs.status, status))
    .orderBy(desc(jobs.createdAt))
    .all();

  const groupedJobs = jobsByStatus.reduce<
    Record<string, { job: Job; users: User[] }>
  >((acc, row) => {
    const job = row.job;
    const user = row.user;
    if (!acc[job.id]) {
      acc[job.id] = { job: job, users: [] };
    }
    if (user) {
      acc[job.id].users.push(user);
    }
    return acc;
  }, {});

  const groupedJobsArray = Object.values(groupedJobs);
  return groupedJobsArray;
};

export const getJobsByRequestor = async (
  requestorId: string,
  status?: Status
) => {
  const jobsByRequestor = await db
    .select()
    .from(jobs)
    .where(
      status
        ? and(eq(jobs.requestorId, requestorId), eq(jobs.status, status))
        : eq(jobs.requestorId, requestorId)
    )
    .orderBy(desc(jobs.createdAt));
  return jobsByRequestor;
};

export async function getAllReviewsGroupedByOrder() {
  const reviews = await db
    .select()
    .from(jobReviews)
    .leftJoin(jobReviewImages, eq(jobReviews.id, jobReviewImages.jobReviewId))
    .orderBy(jobReviews.order)
    .all();

  const reviewsWithImages = reviews.reduce<Record<string, JobReviewWithImages>>(
    (acc, row) => {
      const jobReview = row.jobReview;
      const image = row.jobReviewImage;
      if (!acc[jobReview.id]) {
        acc[jobReview.id] = { review: jobReview, images: [] };
      }
      if (image) {
        acc[jobReview.id].images.push(image);
      }
      return acc;
    },
    {}
  );

  const reviewsWithImagesArray = Object.values(reviewsWithImages);
  const reviewsGroupedByOrder = new Map<number, JobReviewWithImages[]>();
  reviewsWithImagesArray.forEach((jobReview) => {
    const reviewGroup = reviewsGroupedByOrder.get(jobReview.review.order);
    if (!reviewGroup) {
      reviewsGroupedByOrder.set(jobReview.review.order, [jobReview]);
    } else {
      reviewGroup.push(jobReview);
    }
  });

  const reviewsGroupedArray = Array.from(reviewsGroupedByOrder.values());
  return reviewsGroupedArray;
}

export async function getReviewById(jobReviewId: string) {
  const reviewsWithImages = await db
    .select()
    .from(jobReviews)
    .leftJoin(jobReviewImages, eq(jobReviews.id, jobReviewImages.jobReviewId))
    .where(eq(jobReviews.id, jobReviewId))
    .orderBy(jobReviews.order)
    .all();

  const groupedReviews = reviewsWithImages.reduce<
    Record<string, JobReviewWithImages>
  >((acc, row) => {
    const jobReview = row.jobReview;
    const image = row.jobReviewImage;
    if (!acc[jobReview.id]) {
      acc[jobReview.id] = { review: jobReview, images: [] };
    }
    if (image) {
      acc[jobReview.id].images.push(image);
    }
    return acc;
  }, {});

  const requestedJobReview = groupedReviews[jobReviewId];
  return requestedJobReview;
}

export async function getStudentAthleteProfileBySlug(slug: string) {
  const studentAthleteResume = await db
    .select()
    .from(studentAthleteProfiles)
    .leftJoin(
      studentAthleteResumeItems,
      eq(studentAthleteProfiles.id, studentAthleteResumeItems.studentAthleteId)
    )
    .where(eq(studentAthleteProfiles.slug, slug))
    .all();

  const profileWithResume = studentAthleteResume.reduce<
    Record<string, StudentAthleteProfileWithResume>
  >((acc, row) => {
    const profile = row.studentAthleteProfile;
    const resumeItem = row.studentAthleteResumeItem;
    if (!acc[profile.slug]) {
      acc[profile.slug] = { profile: profile, resume: [] };
    }
    if (resumeItem) {
      acc[profile.slug].resume.push(resumeItem);
    }
    return acc;
  }, {});

  const requestedStudentAthlete = profileWithResume[slug];
  return requestedStudentAthlete;
}
