import Link from "next/link";
import { JobReview, Role } from "@prisma/client";
import { MessageSquarePlus } from "lucide-react";

import { getReviews } from "@lib/data";
import { getCurrentUser } from "@lib/session";
import Container from "@components/Container";
import H1 from "@components/typography/h1";
import H2 from "@components/typography/h2";
import { Button } from "@components/ui/button";
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
  const user = await getCurrentUser();

  const groupedReviewsArray = (await getReviews(
    true
  )) as JobReviewWithImages[][];

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
      {groupedReviewsArray.map((reviews, idx) => {
        if (reviews.length === 1) {
          const review = reviews[0];
          return (
            <ReviewSection
              key={review.id}
              reviewId={review.id}
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
