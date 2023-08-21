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

export const metadata = {
  title: "Dashboard",
};

export default async function JobDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: true,
      published: true,
      createdAt: true,
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
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.author.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
              <CardFooter>
                <p>{formatDate(post.createdAt)}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
