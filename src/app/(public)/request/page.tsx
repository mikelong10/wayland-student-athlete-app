import { getCurrentUser } from "@lib/session";
import RequestPageContent from "./RequestPageContent";

export const metadata = {
  title: "Request a job",
};

export default async function RequestPage() {
  const user = await getCurrentUser();

  return <RequestPageContent user={user} />;
}
