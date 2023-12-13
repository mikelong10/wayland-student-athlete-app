import { redirect } from "next/navigation";

import { getCurrentUser } from "@lib/session";
import ProfilePageContent from "./ProfilePageContent";

export const metadata = {
  title: "Profile",
  description: "View and manage your profile.",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <ProfilePageContent user={user} />;
}
