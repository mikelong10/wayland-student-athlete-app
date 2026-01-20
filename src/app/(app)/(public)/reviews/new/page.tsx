import { Suspense } from "react";

import {
  AddReviewFormSkeleton,
  AddReviewFormWrapper,
} from "./AddReviewFormWrapper";

export default function AddReviewPage() {
  return (
    <Suspense fallback={<AddReviewFormSkeleton />}>
      <AddReviewFormWrapper />
    </Suspense>
  );
}
