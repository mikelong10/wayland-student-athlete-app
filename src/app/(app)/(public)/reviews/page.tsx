import Container from "@components/Container";
import H1 from "@components/typography/h1";
import H2 from "@components/typography/h2";
import { Suspense } from "react";
import { ReviewsList } from "./ReviewsList";
import { ReviewsListSkeleton } from "./ReviewsListSkeleton";

export const metadata = {
  title: "Reviews | Wayland Student-Athlete",
  description:
    "We've built up a strong reputation over the years with our hard work and friendly service. Hear what others are saying about WSA and how we can help you!",
};

export default function ReviewsPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center pt-32">
      <Container className="w-full">
        <div className="flex w-full flex-col items-center gap-4 text-center">
          <div className="flex w-full flex-col items-center gap-8">
            <div className="flex flex-col gap-2">
              <H1>Reviews</H1>
              <H2>Hear what others are saying!</H2>
            </div>
          </div>
        </div>
      </Container>
      <Suspense fallback={<ReviewsListSkeleton />}>
        <ReviewsList />
      </Suspense>
    </main>
  );
}
