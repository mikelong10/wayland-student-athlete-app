import { notFound, redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import { Separator } from "@components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import UserCard from "@components/UserCard";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  if (user.role !== Role.ADMIN) {
    notFound();
  }

  const allUsers = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const citizens = await db.user.findMany({
    where: {
      role: Role.CITIZEN,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const studentAthletes = await db.user.findMany({
    where: {
      OR: [
        {
          role: Role.STUDENTATHLETE,
        },

        { role: Role.ADMIN },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const usersTabs = [
    {
      value: "all-users",
      users: allUsers,
    },
    {
      value: "citizens",
      users: citizens,
    },
    {
      value: "student-athletes",
      users: studentAthletes,
    },
  ];

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <section className="flex h-full w-full max-w-[1600px] flex-col px-6 py-20 md:px-10 lg:px-16  xl:px-24">
        {user.role === Role.ADMIN ? (
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Manage users
            </h1>
            <Separator />
            <Tabs defaultValue="all-users" className="w-full">
              <TabsList className="mb-4 flex w-full">
                <TabsTrigger value="all-users" className="flex-1">
                  All
                </TabsTrigger>
                <TabsTrigger value="citizens" className="flex-1">
                  Citizens
                </TabsTrigger>
                <TabsTrigger value="student-athletes" className="flex-1">
                  Student-Athletes
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
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Unauthorized
            </h1>
          </div>
        )}
      </section>
    </main>
  );
}
