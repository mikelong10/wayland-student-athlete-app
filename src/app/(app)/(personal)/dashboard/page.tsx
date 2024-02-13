import { notFound } from "next/navigation";
import { Role } from "@prisma/client";

import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import BusinessJobCard from "@components/BusinessJobCard";
import Container from "@components/Container";
import H1 from "@components/typography/h1";
import { Separator } from "@components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

export const metadata = {
  title: "Jobs Dashboard | Wayland Student-Athlete",
  description: "Manage job statuses and assignees.",
};

export default async function JobDashboard() {
  const user = await getCurrentUser();

  if (!(user?.role === Role.ADMIN || user?.role === Role.STUDENTATHLETE)) {
    notFound();
  }

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
      assignments: {
        include: {
          user: true,
        },
      },
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
      assignments: {
        include: {
          user: true,
        },
      },
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
      assignments: {
        include: {
          user: true,
        },
      },
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
      <Container className="flex size-full max-w-[1600px] flex-col pb-20 pt-32">
        <div className="flex flex-col gap-6">
          <H1>Manage Jobs</H1>
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
                      currentAssignees={job.assignments.map(
                        (assignment) => assignment.user
                      )}
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
