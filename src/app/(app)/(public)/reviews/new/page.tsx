import { Suspense } from "react";
import { AddReviewFormSkeleton } from "./AddReviewFormSkeleton";
import { AddReviewFormWrapper } from "./AddReviewFormWrapper";

export default function AddReviewPage() {
  return (
    <Suspense fallback={<AddReviewFormSkeleton />}>
      <AddReviewFormWrapper />
    </Suspense>
  );
}
