import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@components/ui/button";
import { ChevronLeft, Command } from "lucide-react";
import { UserAuthForm } from "@components/auth/UserAuthForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant={"ghost"} className="flex items-center gap-3">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
      </Link>
      <div className="flex flex-col justify-center space-y-6 w-full max-w-md">
        <div className="flex flex-col w-full space-y-2 text-center">
          <Command className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in through Google, Facebook, or Email
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
