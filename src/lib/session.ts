import { getServerSession } from "next-auth/next";

import { authOptions } from "@lib/auth";
import { db } from "./db";
import { ActiveUser } from "./types";

export async function getCurrentUser(): Promise<ActiveUser | undefined> {
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
    return { ...userFromNextAuth, ...userFromDb };
  }
}
