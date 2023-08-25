import { User } from "@prisma/client";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@lib/auth";
import { db } from "./db";

export async function getCurrentUser(): Promise<User | undefined> {
  const session = await getServerSession(authOptions);
  const userFromNextAuth = session?.user;
  console.log("userFromNextAuth", userFromNextAuth);

  if (userFromNextAuth) {
    const userFromDb = await db.user.findFirst({
      where: {
        email: userFromNextAuth.email ?? undefined,
      },
    });
    console.log("userFromDb", userFromDb);
    if (userFromDb) {
      return { ...userFromNextAuth, ...userFromDb };
    }
  }
}
