import { getCurrentUser } from "@lib/session";
import RequestPageContent from "./RequestPageContent";

export const metadata = {
  title: "Request a Job | Wayland Student-Athlete",
  description:
    "Fill out our form to send us a job request, and we'll get back to you as soon as possible!",
};

export default async function RequestPage() {
  const user = await getCurrentUser();

  return <RequestPageContent user={user} />;
}
