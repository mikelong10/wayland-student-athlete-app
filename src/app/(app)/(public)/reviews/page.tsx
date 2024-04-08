import Link from "next/link";
import { getAllReviewsGroupedByOrder } from "@db/queries";
import { MessageSquarePlus } from "lucide-react";

import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import Container from "@components/Container";
import H1 from "@components/typography/h1";
import H2 from "@components/typography/h2";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import MultiReviewCarousel from "./MultiReviewCarousel";
import ReviewSection from "./ReviewSection";

export const metadata = {
  title: "Reviews | Wayland Student-Athlete",
  description:
    "We've built up a strong reputation over the years with our hard work and friendly service. Hear what others are saying about WSA and how we can help you!",
};

export default async function ReviewsPage() {
  const user = await getCurrentUser();

  const groupedReviewsArray = await getAllReviewsGroupedByOrder();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center pt-32">
      <Container className="w-full">
        <div className="flex w-full flex-col items-center gap-4 text-center">
          <div className="flex w-full flex-col items-center gap-8">
            <div className="flex flex-col gap-2">
              <H1>Reviews</H1>
              <H2>Hear what others are saying!</H2>
            </div>
            {user?.role === Role.ADMIN && (
              <Button asChild variant={"outline"}>
                <Link href={"/reviews/new"} className="flex gap-2">
                  <MessageSquarePlus />
                  Add review
                </Link>
              </Button>
            )}
          </div>
          <Separator className="mt-6" />
        </div>
      </Container>
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
    </main>
  );
}
