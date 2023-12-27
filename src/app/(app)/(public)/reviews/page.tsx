import { JobReview } from "@prisma/client";

import { db } from "@lib/db";
import Container from "@components/Container";
import H1 from "@components/typography/h1";
import H2 from "@components/typography/h2";
import { Separator } from "@components/ui/separator";
import MultiReviewCarousel from "./MultiReviewCarousel";
import ReviewSection from "./ReviewSection";

export const metadata = {
  title: "Reviews",
  description: "Hear what others are saying",
};

export type JobReviewWithImages = JobReview & {
  reviewImages: {
    id: string;
    uploadedAt: Date;
    updatedAt: Date;
    src: string;
    alt: string;
    width: number;
    height: number;
    jobReviewId: string;
  }[];
};

export default async function ReviewsPage() {
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

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center pt-32">
      <Container className="w-full">
        <div className="flex w-full flex-col gap-2 text-center">
          <H1>Reviews</H1>
          <H2>Hear what others are saying</H2>
          <Separator className="mt-6" />
        </div>
      </Container>
      {Array.from(groupedReviews.values()).map((reviews, idx) => {
        if (reviews.length === 1) {
          const review = reviews[0];
          return (
            <ReviewSection
              key={review.id}
              images={review.reviewImages}
              reviewBlurb={review.reviewBlurb}
              reviewText={review.reviewText}
              reviewerName={review.reviewerName}
              variant={idx % 3 === 0 ? "left" : "right"}
              bgColor={
                idx % 3 === 0
                  ? "bg-background"
                  : idx % 3 === 1
                    ? "bg-accent"
                    : "bg-cream"
              }
            />
          );
        } else {
          return (
            <MultiReviewCarousel
              key={reviews[0].order}
              reviews={reviews}
              bgColor={
                idx % 3 === 0
                  ? "bg-background"
                  : idx % 3 === 1
                    ? "bg-accent"
                    : "bg-cream"
              }
            />
          );
        }
      })}
    </main>
  );
}
