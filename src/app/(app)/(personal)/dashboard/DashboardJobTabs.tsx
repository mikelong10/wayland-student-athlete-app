import BusinessJobCard from "@components/BusinessJobCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { db } from "@db";
import { getJobsByStatus } from "@db/queries";
import { users } from "@db/schema/auth";

import { Role, Status } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import { asc, eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function DashboardJobTabs() {
  const [user, allStudentAthletes, toDoJobs, inProgressJobs, doneJobs] =
    await Promise.all([
      getCurrentUser(),
      db
        .select()
        .from(users)
        .where(
          or(eq(users.role, Role.ADMIN), eq(users.role, Role.STUDENT_ATHLETE))
        )
        .orderBy(asc(users.name)),
      getJobsByStatus(Status.TODO),
      getJobsByStatus(Status.IN_PROGRESS),
      getJobsByStatus(Status.DONE),
    ]);

  if (!(user?.role === Role.ADMIN || user?.role === Role.STUDENT_ATHLETE)) {
    notFound();
  }

  const jobsTabs = [
    {
      value: "to-do",
      jobs: toDoJobs,
      noneMessage: "No jobs available to pick up.",
    },
    {
      value: "in-progress",
      jobs: inProgressJobs,
      noneMessage: "No jobs currently in progress.",
    },
    {
      value: "done",
      jobs: doneJobs,
      noneMessage: "No jobs have been completed yet.",
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
      </TabsList>
      {jobsTabs.map((tabContent) => (
        <TabsContent key={tabContent.value} value={tabContent.value}>
          {!tabContent.jobs.length && (
            <div className="flex w-full items-center justify-center">
              <p className="text-sm">{tabContent.noneMessage}</p>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tabContent.jobs.map((job) => (
              <BusinessJobCard
                key={job.job.id}
                job={job.job}
                currentAssignees={job.users}
                allStudentAthletes={allStudentAthletes}
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export function DashboardJobTabsSkeleton() {
  return (
    <div className="w-full">
      <div className="bg-muted mb-4 flex w-full gap-1 rounded-lg p-1">
        <div className="bg-background h-9 flex-1 animate-pulse rounded-md" />
        <div className="bg-muted h-9 flex-1 rounded-md" />
        <div className="bg-muted h-9 flex-1 rounded-md" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-card flex flex-col gap-4 rounded-lg border p-4"
          >
            <div className="flex flex-col gap-2">
              <div className="bg-muted h-6 w-48 animate-pulse rounded" />
              <div className="bg-muted h-4 w-32 animate-pulse rounded" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-muted h-4 w-full animate-pulse rounded" />
              <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
            </div>
            <div className="flex gap-2">
              <div className="bg-muted h-6 w-20 animate-pulse rounded-full" />
              <div className="bg-muted h-6 w-16 animate-pulse rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
