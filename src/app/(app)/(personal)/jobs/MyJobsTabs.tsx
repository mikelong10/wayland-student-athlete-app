import PersonalJobCard from "@components/PersonalJobCard";
import { Button } from "@components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { getJobsByRequestor } from "@db/queries";
import type { Job } from "@db/types";
import { Status } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export async function MyJobsTabs() {
  const user = await getCurrentUser();

  let allJobs: Job[] = [];
  let toDoJobs: Job[] = [];
  let inProgressJobs: Job[] = [];
  let doneJobs: Job[] = [];

  if (user) {
    [allJobs, toDoJobs, inProgressJobs, doneJobs] = await Promise.all([
      getJobsByRequestor(user.id),
      getJobsByRequestor(user.id, Status.TODO),
      getJobsByRequestor(user.id, Status.IN_PROGRESS),
      getJobsByRequestor(user.id, Status.DONE),
    ]);
  }

  const jobsTabs = [
    {
      value: "to-do",
      description: (
        <p className="text-sm tracking-tight">
          You have <span className="font-bold">{toDoJobs.length}</span>{" "}
          {toDoJobs.length === 1 ? "job" : "jobs"} that we haven&apos;t gotten
          to yet.{" "}
          {toDoJobs.length > 0
            ? `We should be getting to ${
                toDoJobs.length === 1 ? "it" : "these"
              } shortly!`
            : "How may we assist you?"}
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
          {inProgressJobs.length > 0
            ? "Looking forward to helping you out!"
            : "We hope there will be soon!"}
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
          {doneJobs.length > 0
            ? "Thanks for reaching out to us!"
            : "We hope there will be soon!"}
        </p>
      ),
      jobs: doneJobs,
    },
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
  ];

  return (
    <Tabs defaultValue="to-do" className="w-full">
      <TabsList className="mb-4 flex w-full">
        <TabsTrigger value="to-do" className="flex-1">
          To-do
        </TabsTrigger>
        <TabsTrigger value="in-progress" className="flex-1">
          In progress
        </TabsTrigger>
        <TabsTrigger value="done" className="flex-1">
          Done
        </TabsTrigger>
        <TabsTrigger value="all" className="flex-1">
          All
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {tabContent.jobs.map((job) => (
                <PersonalJobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="flex w-full items-center justify-center">
              <Link href="/request">
                <Button className="mt-4 flex items-center gap-2">
                  Request a job
                  <MoveRight />
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
