import { getAllReviewsGroupedByOrder, getReviewById } from "@db/queries";
import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import { notFound } from "next/navigation";
import EditReviewForm from "./EditReviewForm";

export default async function EditReviewPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
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
