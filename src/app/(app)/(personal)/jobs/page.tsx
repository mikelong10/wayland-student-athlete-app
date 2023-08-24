import Link from "next/link";
import { redirect } from "next/navigation";
import { Job } from "@prisma/client";
import { MoveRight } from "lucide-react";

import { authOptions } from "@lib/auth";
import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import JobCard from "@components/JobCard";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

export const metadata = {
  title: "Dashboard",
};

export default async function JobDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const allJobs: Job[] = await db.job.findMany({
    where: {
      requestorId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const toDoJobs: Job[] = await db.job.findMany({
    where: {
      requestorId: user.id,
      status: "TODO",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const inProgressJobs: Job[] = await db.job.findMany({
    where: {
      requestorId: user.id,
      status: "INPROGRESS",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const doneJobs: Job[] = await db.job.findMany({
    where: {
      requestorId: user.id,
      status: "DONE",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const jobsTabs = [
    {
      value: "all",
      description: (
        <p className="text-sm tracking-tight">
          You&apos;ve requested{" "}
          <span className="font-bold">{allJobs.length}</span>{" "}
          {allJobs.length === 1 ? "job" : "jobs"} with us so far.{" "}
          {allJobs.length > 0 && "Thanks for doing business with us!"}
        </p>
      ),
      jobs: allJobs,
    },
    {
      value: "to-do",
      description: (
        <p className="text-sm tracking-tight">
          You have <span className="font-bold">{toDoJobs.length}</span>{" "}
          {toDoJobs.length === 1 ? "job" : "jobs"} that we haven&apos;t gotten
          to yet.{" "}
          {toDoJobs.length > 0 &&
            ` We should be getting to ${
              toDoJobs.length === 1 ? "it" : "these"
            } shortly!`}
        </p>
      ),
      jobs: toDoJobs,
    },
    {
      value: "in-progress",
      description: (
        <p className="text-sm tracking-tight">
          You have <span className="font-bold">{inProgressJobs.length}</span>{" "}
          {inProgressJobs.length === 1 ? "job" : "jobs"} that we&apos;re
          currently working with you on.{" "}
          {inProgressJobs.length > 0 && "Looking forward to helping you out!"}
        </p>
      ),
      jobs: inProgressJobs,
    },
    {
      value: "done",
      description: (
        <p className="text-sm tracking-tight">
          You have <span className="font-bold">{doneJobs.length}</span>{" "}
          {doneJobs.length === 1 ? "job" : "jobs"} that you&apos;ve requested
          and we&apos;ve completed.{" "}
          {inProgressJobs.length > 0 && "Thanks for reaching out to us!"}
        </p>
      ),
      jobs: doneJobs,
    },
  ];

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <section className="flex h-full w-full flex-col px-6 py-20 sm:max-w-[768px] md:px-10 lg:max-w-[960px] lg:px-16 xl:px-24">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold tracking-tight">My jobs</h1>
          <Separator />
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 flex w-full">
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
              <TabsTrigger value="to-do" className="flex-1">
                To-do
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="flex-1">
                In progress
              </TabsTrigger>
              <TabsTrigger value="done" className="flex-1">
                Done
              </TabsTrigger>
            </TabsList>
            {jobsTabs.map((tabContent) => (
              <TabsContent
                key={tabContent.value}
                value={tabContent.value}
                className="flex flex-col gap-4"
              >
                {tabContent.description}
                {tabContent.jobs.length ? (
                  tabContent.jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))
                ) : (
                  <div className="flex w-full items-center justify-center">
                    <Link href="/request">
                      <Button
                        variant={"accent"}
                        className="flex w-40 items-center gap-2"
                      >
                        Request a job
                        <MoveRight />
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </main>
  );
}
