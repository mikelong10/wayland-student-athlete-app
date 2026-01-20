import { db } from "@db";
import { users } from "@db/schema/auth";
import { eq } from "drizzle-orm";

import { auth } from "./auth";

export async function getCurrentUser() {
  const session = await auth();
  const userFromNextAuth = session?.user;

  if (userFromNextAuth?.email) {
    const userFromDb = await db.query.users.findFirst({
      where: eq(users.email, userFromNextAuth.email),
    });

    if (userFromDb) {
      return { ...userFromNextAuth, ...userFromDb };
    }
  }
}
