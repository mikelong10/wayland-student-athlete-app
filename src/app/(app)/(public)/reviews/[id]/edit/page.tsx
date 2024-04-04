import { notFound } from "next/navigation";
import { getAllReviewsGroupedByOrder, getReviewById } from "@db/queries";

import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
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

  const jobReview = await getReviewById(params.id);

  if (!jobReview) {
    notFound();
  }

  const groupedReviewsArray = await getAllReviewsGroupedByOrder();

  return (
    <EditReviewForm
      jobReview={jobReview}
      groupedReviewsArray={groupedReviewsArray}
    />
  );
}
