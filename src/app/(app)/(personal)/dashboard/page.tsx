import { Role } from "@prisma/client";

import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import BusinessJobCard from "@components/BusinessJobCard";
import Container from "@components/Container";
import { Separator } from "@components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

export const metadata = {
  title: "Jobs Dashboard",
  description: "Manage job statuses and assignees.",
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
      name: "asc",
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
      createdAt: "desc",
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
      createdAt: "desc",
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
      <Container className="flex h-full w-full max-w-[1600px] flex-col pb-12 pt-24">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Manage Jobs
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
              <TabsContent key={tabContent.value} value={tabContent.value}>
                {!tabContent.jobs.length && (
                  <div className="flex w-full items-center justify-center">
                    <p className="text-sm">{tabContent.noneMessage}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {tabContent.jobs.map((job) => (
                    <BusinessJobCard
                      key={job.id}
                      job={job}
                      currentAssignee={job.assignee}
                      currentUser={user}
                      allStudentAthletes={allStudentAthletes}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Container>
    </main>
  );
}
