"use client";

import Link from "next/link";
import { useState } from "react";
import { User } from "@prisma/client";
import { ChevronLeft, MailCheck, Redo2 } from "lucide-react";

import Container from "@components/Container";
import H1 from "@components/typography/h1";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import RequestJobForm from "./RequestJobForm";

export default function RequestPageContent({ user }: { user?: User }) {
  const [requestSent, setRequestSent] = useState(false);

  if (requestSent) {
    return (
      <Container className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-4 pb-12 pt-24 sm:max-w-[768px] lg:max-w-[960px]">
        <div className="bg-success h-12 w-12 rounded-full p-3">
          <MailCheck color="white" />
        </div>
        <p className="text-center">
          Thanks for submitting your job request! We will get to it shortly.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Button className="flex gap-2" onClick={() => setRequestSent(false)}>
            <Redo2 />
            Request another
          </Button>
          <div className="flex gap-2">
            <Link href="/">
              <Button
                variant={"ghost"}
                className="flex items-center gap-1 pr-6"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to home
              </Button>
            </Link>
            {!!user && (
              <Link href="/jobs">
                <Button className="px-6">View your jobs</Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex h-full min-h-screen w-full flex-col justify-center gap-4 pb-12 pt-24 sm:max-w-[768px] md:items-center lg:max-w-[960px]">
      <H1 className="w-full text-left">Request a Job</H1>
      <Separator />
      <RequestJobForm setRequestSent={setRequestSent} />
    </Container>
  );
}
