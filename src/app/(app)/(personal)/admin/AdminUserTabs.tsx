import UserCard from "@components/UserCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { getUsersByRole } from "@db/queries";
import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import { notFound } from "next/navigation";

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
