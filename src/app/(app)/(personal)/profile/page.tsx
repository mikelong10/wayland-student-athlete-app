import { redirect } from "next/navigation";

import { authOptions } from "@lib/auth";
import { getCurrentUser } from "@lib/session";
import { Button } from "@components/ui/button";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold tracking-tight">Profile</h1>
      <Button type="button">Click me!</Button>
    </main>
  );
}
