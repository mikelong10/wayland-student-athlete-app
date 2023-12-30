import { getReviews } from "@lib/data";
import { JobReviewWithImages } from "../page";
import AddReviewForm from "./AddReviewForm";

export const metadata = {
  title: "Request a job",
};

export default async function AddReviewPage() {
  const groupedReviewsArray = (await getReviews(
    true
  )) as JobReviewWithImages[][];

  return <AddReviewForm groupedReviewsArray={groupedReviewsArray} />;
}
