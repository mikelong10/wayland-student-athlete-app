import { Role } from "@prisma/client";

import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import BusinessJobCard from "@components/BusinessJobCard";
import { Separator } from "@components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

export const metadata = {
  title: "Dashboard",
};

export default async function JobDashboard() {
  const user = await getCurrentUser();

  const allStudentAthletes = await db.user.findMany({
    where: {
      OR: [
        {
          role: Role.STUDENTATHLETE,
        },

        { role: Role.ADMIN },
      ],
    },
    orderBy: {
      name: "desc",
    },
  });

  const toDoJobs = await db.job.findMany({
    include: {
      assignee: true,
    },
    where: {
      status: "TODO",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const inProgressJobs = await db.job.findMany({
    include: {
      assignee: true,
    },
    where: {
      status: "INPROGRESS",
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  const doneJobs = await db.job.findMany({
    include: {
      assignee: true,
    },
    where: {
      status: "DONE",
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

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
    <main className="flex min-h-screen w-full flex-col items-center">
      <section className="flex h-full w-full max-w-[1600px] flex-col px-6 py-20 md:px-10 lg:px-16  xl:px-24">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Manage jobs
          </h1>
          <Separator />
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
              <TabsContent
                key={tabContent.value}
                value={tabContent.value}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
              >
                {tabContent.jobs.length ? (
                  tabContent.jobs.map((job) => (
                    <BusinessJobCard
                      key={job.id}
                      job={job}
                      currentAssignee={job.assignee}
                      currentUser={user}
                      allStudentAthletes={allStudentAthletes}
                    />
                  ))
                ) : (
                  <div className="flex w-full items-center justify-center">
                    <p className="text-sm">{tabContent.noneMessage}</p>
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
