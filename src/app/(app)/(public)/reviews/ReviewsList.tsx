import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { getAllReviewsGroupedByOrder } from "@db/queries";

import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import { MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import MultiReviewCarousel from "./MultiReviewCarousel";
import ReviewSection from "./ReviewSection";

export async function ReviewsList() {
  const [user, groupedReviewsArray] = await Promise.all([
    getCurrentUser(),
    getAllReviewsGroupedByOrder(),
  ]);

  return (
    <>
      {user?.role === Role.ADMIN && (
        <div className="mb-4 flex justify-center">
          <Button asChild variant={"outline"}>
            <Link href={"/reviews/new"} className="flex gap-2">
              <MessageSquarePlus />
              Add review
            </Link>
          </Button>
        </div>
      )}
      <Separator className="mt-6" />
      {groupedReviewsArray.map((jobReviews, idx) => {
        if (jobReviews.length === 1) {
          const jobReview = jobReviews[0];
          return (
            <ReviewSection
              key={jobReview.review.id}
              user={user}
              reviewId={jobReview.review.id}
              images={jobReview.images}
              reviewBlurb={jobReview.review.reviewBlurb}
              reviewText={jobReview.review.reviewText}
              reviewerName={jobReview.review.reviewerName}
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
              key={jobReviews[0].review.order}
              user={user}
              jobReviews={jobReviews}
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
    </>
  );
}
