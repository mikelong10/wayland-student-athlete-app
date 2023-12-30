import { JobReviewWithImages } from "@app/(app)/(public)/reviews/page";

import { db } from "./db";

export async function getReviews(grouped?: boolean) {
  if (grouped) {
    const reviews = await db.jobReview.findMany({
      include: {
        reviewImages: true,
      },
      orderBy: {
        order: "asc",
      },
    });
    const groupedReviews = new Map<number, JobReviewWithImages[]>();
    reviews.forEach((review) => {
      const reviewGroup = groupedReviews.get(review.order);
      if (!reviewGroup) {
        groupedReviews.set(review.order, [review]);
      } else {
        reviewGroup.push(review);
      }
    });
    const groupedReviewsArray = Array.from(groupedReviews.values());
    return groupedReviewsArray;
  }
  const reviews = await db.jobReview.findMany({
    orderBy: {
      order: "asc",
    },
    include: {
      reviewImages: true,
    },
  });
  return reviews;
}
