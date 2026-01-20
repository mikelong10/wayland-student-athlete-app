import Container from "@components/Container";
import H1 from "@components/typography/h1";
import { Separator } from "@components/ui/separator";
import { Suspense } from "react";
import { MyJobsTabs } from "./MyJobsTabs";
import { MyJobsTabsSkeleton } from "./MyJobsTabsSkeleton";

export const metadata = {
  title: "My Jobs | Wayland Student-Athlete",
  description: "View and track the jobs you've requested with us.",
};

export default function MyJobs() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <Container className="flex size-full max-w-[1600px] flex-col pb-20 pt-32">
        <div className="flex flex-col gap-6">
          <H1>My Jobs</H1>
          <Separator />
          <Suspense fallback={<MyJobsTabsSkeleton />}>
            <MyJobsTabs />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
