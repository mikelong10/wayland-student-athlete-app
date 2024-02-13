import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Mailbox } from "lucide-react";

import { getCurrentUser } from "@lib/session";
import Container from "@components/Container";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Separator } from "@components/ui/separator";

export default async function VerifyEmailPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <Container className="bg-cream flex min-h-screen w-full flex-col items-center justify-center py-32">
      <Card className="dark:shadow-tertiary flex max-w-3xl flex-col gap-4 rounded-2xl border-none shadow-2xl sm:p-10 md:p-12 lg:p-14 xl:p-16">
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          <div className="bg-success rounded-full p-3 md:p-4">
            <Mailbox color="white" className="size-10 md:size-12" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl">
            Check your email
          </CardTitle>
          <CardDescription className="text-muted-foreground text-xl font-semibold">
            We&apos;ve emailed you a verification link
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-2">
          <p>
            Please{" "}
            <span className="underline underline-offset-4">
              click the link in the email
            </span>{" "}
            to verify your email address.
          </p>
          <p>The link will expire in 24 hours.</p>
          <p>
            If you do not receive the email within a few minutes, please check
            your spam/junk folder or try again.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={"/login"}>
            <Button variant={"traced"}>Back to login</Button>
          </Link>
        </CardFooter>
      </Card>
    </Container>
  );
}
