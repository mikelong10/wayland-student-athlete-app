import { db } from "@db";
import { jobReviewImages, jobReviews } from "@db/schema/content";
import { desc, eq } from "drizzle-orm";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { Role } from "@lib/enums";
import { reviewFormSchema } from "@lib/schemas";
import { getCurrentUser } from "@lib/session";

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== Role.ADMIN) {
      return new Response("Only Admins can edit reviews", {
        status: StatusCodes.FORBIDDEN,
        statusText: ReasonPhrases.FORBIDDEN,
      });
    }

    const { params } = routeContextSchema.parse(context);
    const json = await req.json();
    const updateReviewRequestBody = reviewFormSchema.parse(json);
    const { reviewImages, ...reviewData } = updateReviewRequestBody;

    const highestOrderReview = await db
      .select({ order: jobReviews.order })
      .from(jobReviews)
      .orderBy(desc(jobReviews.order))
      .limit(1);

    const updatedJobReview = await db
      .update(jobReviews)
      .set({
        ...reviewData,
        order:
          reviewData.order === "new"
            ? highestOrderReview[0].order + 1
            : parseInt(reviewData.order),
      })
      .where(eq(jobReviews.id, params.id))
      .returning();

    const currentImages = await db
      .select()
      .from(jobReviewImages)
      .where(eq(jobReviewImages.jobReviewId, updatedJobReview[0].id));
    const currentImageUrls = currentImages.map((image) => image.src);
    const newImageUrls = reviewImages ?? [];
    const imagesToDelete = currentImageUrls.filter(
      (url) => !newImageUrls.includes(url)
    );
    const imagesToAdd = newImageUrls.filter(
      (url) => !currentImageUrls.includes(url)
    );
    // delete images
    for (const url of imagesToDelete) {
      await db.delete(jobReviewImages).where(eq(jobReviewImages.src, url));
    }
    // add images
    for (const url of imagesToAdd) {
      await db.insert(jobReviewImages).values({
        src: url,
        alt: `Image for review by ${reviewData.reviewerName}`,
        jobReviewId: updatedJobReview[0].id,
      });
    }

    return new Response(JSON.stringify(updatedJobReview[0]));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        statusText: ReasonPhrases.UNPROCESSABLE_ENTITY,
      });
    }
    console.log("Error in PATCH /api/reviews/id", error);
    const err = error as Error;
    return new Response(JSON.stringify(err), {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function DELETE(
  _req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== Role.ADMIN) {
      return new Response("Only Admins can delete reviews", {
        status: StatusCodes.FORBIDDEN,
        statusText: ReasonPhrases.FORBIDDEN,
      });
    }

    const { params } = routeContextSchema.parse(context);
    await db
      .delete(jobReviewImages)
      .where(eq(jobReviewImages.jobReviewId, params.id));
    const deletedReview = await db
      .delete(jobReviews)
      .where(eq(jobReviews.id, params.id))
      .returning();

    return new Response(JSON.stringify(deletedReview[0]));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        statusText: ReasonPhrases.UNPROCESSABLE_ENTITY,
      });
    }
    console.log("Error in DELETE /api/student-athletes/id", error);
    const err = error as Error;
    return new Response(JSON.stringify(err), {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
}
