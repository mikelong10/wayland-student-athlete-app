import { notFound, redirect } from "next/navigation"
import { Separator } from "@components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import UserCard from "@components/UserCard"
import { db } from "@lib/db"
import { getCurrentUser } from "@lib/session"

export const metadata = {
  title: "Admin Dashboard",
}

export default async function AdminDashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }
  if (user.role !== "ADMIN") {
    notFound();
  }

  const allUsers = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
  const citizens = await db.user.findMany({
    where: {
      role: "CITIZEN",
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  const studentAthletes = await db.user.findMany({
    where: {
      OR: [
        {
          role: "STUDENTATHLETE",
        },

        { role: "ADMIN" },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  })

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
  ]

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <section className="flex h-full w-full flex-col px-6 py-20 sm:max-w-[600px] lg:max-w-[800px]">
        {user.role === "ADMIN" ? (
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
                  className="flex flex-col gap-4"
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
  )
}
