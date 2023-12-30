import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

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
    <Container className="bg-accent flex min-h-screen w-full flex-col items-center justify-center pb-12 pt-32">
      <div className="sm:w-7/8 flex flex-col gap-6 md:w-3/4 lg:w-2/3 xl:w-1/2">
        <Card className="shadow-tertiary flex flex-col gap-4 border-none shadow-2xl">
          <CardHeader className="flex flex-col gap-2 text-center">
            <CardTitle className="text-2xl sm:text-3xl">
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
              <Button variant={"accent"}>Back to login</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
}
