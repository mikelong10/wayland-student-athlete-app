import { authOptions } from "@lib/auth";
import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import { redirect } from "next/navigation";
import { Job } from "@prisma/client";
import JobCard from "@components/JobCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@components/ui/separator";

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

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <section className="h-full w-full flex flex-col sm:max-w-[768px] lg:max-w-[960px] py-20 px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold tracking-tight">My jobs</h1>
          <Separator />
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full flex mb-4">
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
            <TabsContent value="all" className="flex flex-col gap-4">
              <p className="text-sm tracking-tight">
                These are <span className="italic">all</span> of the jobs
                you&apos;ve requested. Thanks for doing business with us!
              </p>
              {allJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </TabsContent>
            <TabsContent value="to-do" className="flex flex-col gap-4">
              <p className="text-sm tracking-tight">
                These are the jobs you&apos;ve requested{" "}
                <span className="italic">recently</span>. We should be getting
                to these shortly!
              </p>
              {toDoJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </TabsContent>
            <TabsContent value="in-progress" className="flex flex-col gap-4">
              <p className="text-sm tracking-tight">
                These are the jobs we&apos;re{" "}
                <span className="italic">currently</span> working with you on.
                Looking forward to helping you out!
              </p>
              {inProgressJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </TabsContent>
            <TabsContent value="done" className="flex flex-col gap-4">
              <p className="text-sm tracking-tight">
                These are the jobs you&apos;ve requested and we&apos;ve{" "}
                <span className="italic">completed</span>. Thanks for reaching
                out to us!
              </p>
              {doneJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
