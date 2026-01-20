import { Suspense } from "react";

import Container from "@components/Container";
import H1 from "@components/typography/h1";
import { Separator } from "@components/ui/separator";
import { AdminUserTabs, AdminUserTabsSkeleton } from "./AdminUserTabs";

export const metadata = {
  title: "Admin Panel | Wayland Student-Athlete",
  description: "Manage user roles and permissions.",
};

export default function AdminDashboard() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <Container className="flex size-full max-w-[1600px] flex-col pb-20 pt-32">
        <div className="flex flex-col gap-6">
          <H1>Manage Users</H1>
          <Separator />
          <Suspense fallback={<AdminUserTabsSkeleton />}>
            <AdminUserTabs />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
