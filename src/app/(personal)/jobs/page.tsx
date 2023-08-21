import { authOptions } from "@lib/auth";
import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@lib/utils";
import { Badge } from "@components/ui/badge";

export const metadata = {
  title: "Dashboard",
};

export default async function JobDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const jobs = await db.job.findMany({
    where: {
      requestorId: user.id,
    },
    select: {
      id: true,
      adultFirstName: true,
      adultLastName: true,
      createdAt: true,
      description: true,
      status: true,
      time: true,
      requestor: true,
      location: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <section className="h-full w-full flex flex-col py-20 px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
          <h2 className="text-md font-bold tracking-tight">Your jobs</h2>
          {jobs.map((job) => (
            <Card key={job.id} className="flex flex-col gap-4">
              <CardHeader>
                <Badge className="w-fit mb-2">
                  <p>{job.status}</p>
                </Badge>
                <CardTitle>{`Job for ${job.adultFirstName} ${job.adultLastName}`}</CardTitle>
                <CardDescription>Requested by {job.requestor.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{job.description}</p>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  {formatDate(job.createdAt)}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
