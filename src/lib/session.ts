import { User } from "@prisma/client";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@lib/auth";
import { db } from "./db";

export async function getCurrentUser(): Promise<User | undefined> {
  const session = await getServerSession(authOptions);
  const userFromNextAuth = session?.user;

  if (userFromNextAuth && userFromNextAuth.email) {
    const userFromDb = await db.user.findFirst({
      where: {
        email: userFromNextAuth.email,
      },
    });

    if (userFromDb) {
      return { ...userFromNextAuth, ...userFromDb };
    }
  }
}
