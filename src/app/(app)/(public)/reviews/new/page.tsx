import { notFound } from "next/navigation";
import { getAllReviewsGroupedByOrder } from "@db/queries";

import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import AddReviewForm from "./AddReviewForm";

export default async function AddReviewPage() {
  const user = await getCurrentUser();

  if (user?.role !== Role.ADMIN) {
    notFound();
  }

  const groupedReviewsArray = await getAllReviewsGroupedByOrder();

  return <AddReviewForm groupedReviewsArray={groupedReviewsArray} />;
}
