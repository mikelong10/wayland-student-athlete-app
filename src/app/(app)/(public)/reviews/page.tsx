import { db } from "@lib/db";
import Container from "@components/Container";
import H1 from "@components/typography/h1";
import H2 from "@components/typography/h2";
import { Separator } from "@components/ui/separator";
import ReviewSection from "./ReviewSection";

export const metadata = {
  title: "Reviews",
  description: "Hear what others are saying",
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

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center pt-32">
      <Container className="w-full">
        <div className="flex w-full flex-col gap-2 text-center">
          <H1>Reviews</H1>
          <H2>Hear what others are saying</H2>
          <Separator className="mt-6" />
        </div>
      </Container>
      {reviews.map((review, idx) => (
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
      ))}
    </main>
  );
}
