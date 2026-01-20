import { getCurrentUser } from "@lib/session";
import { redirect } from "next/navigation";
import ProfilePageContent from "./ProfilePageContent";

export const metadata = {
  title: "My Profile | Wayland Student-Athlete",
  description: "View and manage your WSA account information.",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <ProfilePageContent user={user} />;
}
