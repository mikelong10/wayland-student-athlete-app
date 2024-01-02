import { notFound } from "next/navigation";
import { Role } from "@prisma/client";

import { getReviews } from "@lib/data";
import { getCurrentUser } from "@lib/session";
import { JobReviewWithImages } from "../page";
import AddReviewForm from "./AddReviewForm";

export default async function AddReviewPage() {
  const user = await getCurrentUser();

  if (user?.role !== Role.ADMIN) {
    notFound();
  }

  const groupedReviewsArray = (await getReviews(
    true
  )) as JobReviewWithImages[][];

  return <AddReviewForm groupedReviewsArray={groupedReviewsArray} />;
}
