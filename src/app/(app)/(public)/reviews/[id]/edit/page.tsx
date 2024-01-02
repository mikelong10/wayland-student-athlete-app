import { notFound } from "next/navigation";
import { Role } from "@prisma/client";

import { getReviews } from "@lib/data";
import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import { JobReviewWithImages } from "../../page";
import EditReviewForm from "./EditReviewForm";

export default async function EditReviewPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();

  if (user?.role !== Role.ADMIN) {
    notFound();
  }

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
