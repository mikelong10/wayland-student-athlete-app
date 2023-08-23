import Link from "next/link";

import { Button } from "@components/ui/button";
import { UserAuthForm } from "@components/auth/UserAuthForm";
import { ChevronLeft, ChevronRight, Command } from "lucide-react";
import { getCurrentUser } from "@lib/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (!!user) {
    redirect("/");
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-bl from-secondary to-background to-70% dark:from-stone-900 dark:to-background">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant={"ghost"} className="flex items-center gap-2 px-4">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
      </Link>
      <div className="flex flex-col justify-center space-y-6 w-full min-w-[280px] max-w-md px-6">
        <div className="flex flex-col w-full space-y-2 text-center">
          <Command className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Get started with Google, Facebook, or Email
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
