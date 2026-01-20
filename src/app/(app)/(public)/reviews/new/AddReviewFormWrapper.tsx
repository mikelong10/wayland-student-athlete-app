import { getAllReviewsGroupedByOrder } from "@db/queries";
import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import { notFound } from "next/navigation";
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
