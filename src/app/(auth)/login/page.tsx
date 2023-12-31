import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { getCurrentUser } from "@lib/session";
import { UserAuthForm } from "@components/auth/UserAuthForm";
import Container from "@components/Container";
import { Button } from "@components/ui/button";
import logo from "../../../../public/logo.png";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <Container className="from-tertiary to-background dark:to-background flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-bl to-70% pb-12 pt-32">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant={"ghost"} className="flex items-center gap-2 px-4">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
      </Link>
      <div className="flex w-full min-w-[280px] max-w-md flex-col justify-center space-y-6">
        <div className="flex w-full flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <Link href={"/"} className="hover:animate-pulse">
              <Image src={logo} alt={"WSA logo"} width={40} height={40} />
            </Link>
          </div>
          <p className="text-2xl font-bold tracking-tight">
            Welcome! Let&apos;s get started.
          </p>
          <p className="text-muted-foreground text-sm">
            Log in with Google, Facebook, or Email
          </p>
        </div>
        <UserAuthForm />
        <div className="text-muted-foreground flex flex-col px-4 text-center text-xs">
          <p>By continuing, you are agreeing to our </p>
          <p>
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </Container>
  );
}
