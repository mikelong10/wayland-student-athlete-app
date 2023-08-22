"use client";

import { Separator } from "@components/ui/separator";
import RequestJobForm from "./RequestJobForm";
import { useState } from "react";
import { ChevronLeft, MailCheck } from "lucide-react";
import { Button } from "@components/ui/button";
import { ActiveUser } from "@lib/types";
import Link from "next/link";

export default function RequestPageContent({ user }: { user?: ActiveUser }) {
  const [requestSent, setRequestSent] = useState(false);

  return (
    <section className="flex flex-col justify-center md:items-center gap-4 min-h-screen h-full w-full sm:max-w-[768px] lg:max-w-[960px] py-24 px-6 md:px-10 lg:px-16 xl:px-24">
      {!requestSent ? (
        <>
          <h1 className="scroll-m-20 w-full text-4xl font-extrabold text-left tracking-tight lg:text-5xl">
            Request a job
          </h1>
          <Separator />
          <RequestJobForm setRequestSent={setRequestSent} />
        </>
      ) : (
        <>
          <div className="bg-success p-3 rounded-full">
            <MailCheck color="white" />
          </div>
          <p>
            Thanks for submitting your job request! We will get to it shortly.
          </p>
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
                <Button variant={"secondary"} className="px-6">
                  View your jobs
                </Button>
              </Link>
            )}
          </div>
        </>
      )}
    </section>
  );
}
