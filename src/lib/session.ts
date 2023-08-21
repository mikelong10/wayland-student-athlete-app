import { getServerSession } from "next-auth/next"
import { authOptions } from "@lib/auth"
import { db } from "./db"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  const userFromNextAuth = session?.user
  console.log('userFromNextAuth', userFromNextAuth)

  if (userFromNextAuth) {
    const userFromDb = await db.user.findFirst({
      where: {
        email: userFromNextAuth.email ?? undefined
      }
    })
    console.log('userFromDb', userFromDb)
    return { ...userFromNextAuth, ...userFromDb }
  }
}
