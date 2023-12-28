import { Role } from "@prisma/client";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const wsaFileRouter = {
  profilePicture: f({ image: { maxFileSize: "4MB" } })
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
      const updatedUser = await db.user.update({
        where: { id: metadata.userId },
        data: { image: file.url },
      });

      return {
        uploadedBy: metadata.userId,
        newProfilePicture: file.url,
        updatedUser: JSON.stringify(updatedUser),
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
} satisfies FileRouter;

export type WSAFileRouter = typeof wsaFileRouter;
