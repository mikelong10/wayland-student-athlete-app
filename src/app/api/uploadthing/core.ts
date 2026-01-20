import { db } from "@db";
import { users } from "@db/schema/auth";
import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const wsaFileRouter = {
  userProfilePicture: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const user = await getCurrentUser();

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const updatedUser = await db
        .update(users)
        .set({ image: file.url })
        .where(eq(users.id, metadata.userId))
        .returning();

      return {
        uploadedBy: metadata.userId,
        newProfilePicture: file.url,
        updatedUser: JSON.stringify(updatedUser[0]),
      };
    }),
  jobReviewImage: f({ image: { maxFileSize: "4MB", maxFileCount: 8 } })
    .middleware(async () => {
      const user = await getCurrentUser();

      // Only admins will be adding reviews
      if (!user || user.role !== Role.ADMIN) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
  studentAthleteProfileImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const user = await getCurrentUser();

      // Only admins will be adding student athlete profiles
      if (!user || user.role !== Role.ADMIN) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type WSAFileRouter = typeof wsaFileRouter;
