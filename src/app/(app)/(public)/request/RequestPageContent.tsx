"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, MailCheck } from "lucide-react";

import { ActiveUser } from "@lib/types";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import RequestJobForm from "./RequestJobForm";

export default function RequestPageContent({ user }: { user?: ActiveUser }) {
  const [requestSent, setRequestSent] = useState(false);

  return (
    <section className="flex h-full min-h-screen w-full flex-col justify-center gap-4 px-6 py-20 sm:max-w-[768px] md:items-center md:px-10 lg:max-w-[960px] lg:px-16 xl:px-24">
      {!requestSent ? (
        <>
          <h1 className="w-full scroll-m-20 text-left text-4xl font-extrabold tracking-tight">
            Request a job
          </h1>
          <Separator />
          <RequestJobForm setRequestSent={setRequestSent} />
        </>
      ) : (
        <>
          <div className="bg-success rounded-full p-3">
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
