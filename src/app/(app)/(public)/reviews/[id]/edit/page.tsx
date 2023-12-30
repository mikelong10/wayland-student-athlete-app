import { notFound } from "next/navigation";

import { getReviews } from "@lib/data";
import { db } from "@lib/db";
import { JobReviewWithImages } from "../../page";
import EditReviewForm from "./EditReviewForm";

export const metadata = {
  title: "Edit Review",
};

export default async function EditReviewPage({
  params,
}: {
  params: { id: string };
}) {
  const review = await db.jobReview.findFirst({
    where: {
      id: params.id,
    },
    include: {
      reviewImages: true,
    },
  });

  if (!review) {
    notFound();
  }

  const groupedReviewsArray = (await getReviews(
    true
  )) as JobReviewWithImages[][];

  return (
    <EditReviewForm review={review} groupedReviewsArray={groupedReviewsArray} />
  );
}
