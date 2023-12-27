import { notFound, redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import Container from "@components/Container";
import H1 from "@components/typography/h1";
import { Separator } from "@components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import UserCard from "@components/UserCard";

export const metadata = {
  title: "Manage users",
  description: "Manage user roles and permissions.",
};

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  if (user.role !== Role.ADMIN) {
    notFound();
  }

  const clients = await db.user.findMany({
    where: {
      role: Role.CLIENT,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const studentAthletes = await db.user.findMany({
    where: {
      role: Role.STUDENTATHLETE,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const admins = await db.user.findMany({
    where: {
      role: Role.ADMIN,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

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
    <main className="flex min-h-screen w-full flex-col items-center">
      <Container className="flex h-full w-full max-w-[1600px] flex-col pb-12 pt-32">
        {user.role === Role.ADMIN ? (
          <div className="flex flex-col gap-6">
            <H1>Manage Users</H1>
            <Separator />
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
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <H1>Unauthorized</H1>
          </div>
        )}
      </Container>
    </main>
  );
}
