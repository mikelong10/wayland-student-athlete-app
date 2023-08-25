import { Button } from "@components/ui/button";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-extrabold tracking-tight">Profile</h1>
      <Button type="button">Click me!</Button>
    </main>
  );
}
