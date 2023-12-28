import { db } from "@lib/db";
import { JobReviewWithImages } from "../page";
import AddReviewForm from "./AddReviewForm";

export const metadata = {
  title: "Request a job",
};

export default async function AddReviewPage() {
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

  return <AddReviewForm groupedReviews={groupedReviews} />;
}
