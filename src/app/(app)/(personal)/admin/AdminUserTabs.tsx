import { notFound } from "next/navigation";
import { getUsersByRole } from "@db/queries";

import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import UserCard from "@components/UserCard";

export async function AdminUserTabs() {
  const [user, clients, studentAthletes, admins] = await Promise.all([
    getCurrentUser(),
    getUsersByRole(Role.CLIENT),
    getUsersByRole(Role.STUDENT_ATHLETE),
    getUsersByRole(Role.ADMIN),
  ]);

  if (user?.role !== Role.ADMIN) {
    notFound();
  }

  const usersTabs = [
    {
      value: "clients",
      users: clients,
    },
    {
      value: "student-athletes",
      users: studentAthletes,
    },
    {
      value: "admins",
      users: admins,
    },
  ];

  return (
    <Tabs defaultValue="admins" className="w-full">
      <TabsList className="mb-4 flex w-full">
        <TabsTrigger value="clients" className="flex-1">
          Clients
        </TabsTrigger>
        <TabsTrigger value="student-athletes" className="flex-1">
          Student-Athletes
        </TabsTrigger>
        <TabsTrigger value="admins" className="flex-1">
          Admins
        </TabsTrigger>
      </TabsList>
      {usersTabs.map((tabContent) => (
        <TabsContent
          key={tabContent.value}
          value={tabContent.value}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {tabContent.users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export function AdminUserTabsSkeleton() {
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
            <div className="flex items-center gap-4">
              <div className="bg-muted size-12 animate-pulse rounded-full" />
              <div className="flex flex-col gap-2">
                <div className="bg-muted h-5 w-32 animate-pulse rounded" />
                <div className="bg-muted h-4 w-48 animate-pulse rounded" />
              </div>
            </div>
            <div className="bg-muted h-8 w-24 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
