import Container from "@components/Container";
import H1 from "@components/typography/h1";
import { Separator } from "@components/ui/separator";
import { Suspense } from "react";
import { DashboardJobTabs, DashboardJobTabsSkeleton } from "./DashboardJobTabs";

export const metadata = {
  title: "Jobs Dashboard | Wayland Student-Athlete",
  description: "Manage job statuses and assignees.",
};

export default function JobDashboard() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <Container className="flex size-full max-w-[1600px] flex-col pb-20 pt-32">
        <div className="flex flex-col gap-6">
          <H1>Manage Jobs</H1>
          <Separator />
          <Suspense fallback={<DashboardJobTabsSkeleton />}>
            <DashboardJobTabs />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
