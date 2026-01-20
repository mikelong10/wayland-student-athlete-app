import { notFound } from "next/navigation";
import { getAllReviewsGroupedByOrder } from "@db/queries";

import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import Container from "@components/Container";
import { Separator } from "@components/ui/separator";
import AddReviewForm from "./AddReviewForm";

export async function AddReviewFormWrapper() {
  const [user, groupedReviewsArray] = await Promise.all([
    getCurrentUser(),
    getAllReviewsGroupedByOrder(),
  ]);

  if (user?.role !== Role.ADMIN) {
    notFound();
  }

  return <AddReviewForm groupedReviewsArray={groupedReviewsArray} />;
}

export function AddReviewFormSkeleton() {
  return (
    <Container className="flex size-full min-h-screen flex-col justify-center gap-4 pb-20 pt-32 sm:max-w-screen-md md:items-center lg:max-w-[960px]">
      <div className="bg-muted h-10 w-48 animate-pulse rounded" />
      <Separator />
      <div className="mt-4 flex w-full flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="bg-muted h-8 w-32 animate-pulse rounded" />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              {/* Reviewer name field */}
              <div className="flex w-full flex-col gap-2">
                <div className="bg-muted h-4 w-28 animate-pulse rounded" />
                <div className="bg-muted h-10 w-full animate-pulse rounded" />
                <div className="bg-muted h-3 w-40 animate-pulse rounded" />
              </div>
              {/* Job blurb field */}
              <div className="flex w-full flex-col gap-2">
                <div className="bg-muted h-4 w-20 animate-pulse rounded" />
                <div className="bg-muted h-10 w-full animate-pulse rounded" />
                <div className="bg-muted h-3 w-64 animate-pulse rounded" />
              </div>
              {/* Review content field */}
              <div className="flex w-full flex-col gap-2">
                <div className="bg-muted h-4 w-28 animate-pulse rounded" />
                <div className="bg-muted h-40 w-full animate-pulse rounded" />
                <div className="bg-muted h-3 w-32 animate-pulse rounded" />
              </div>
              {/* Group select field */}
              <div className="flex w-full flex-col gap-2">
                <div className="bg-muted h-4 w-16 animate-pulse rounded" />
                <div className="bg-muted h-10 w-full animate-pulse rounded" />
                <div className="bg-muted h-12 w-full animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-muted h-8 w-24 animate-pulse rounded" />
          <div className="bg-muted h-48 w-full animate-pulse rounded-lg border border-dashed" />
        </div>
        <div className="bg-muted mt-2 h-10 w-full animate-pulse rounded" />
      </div>
    </Container>
  );
}
