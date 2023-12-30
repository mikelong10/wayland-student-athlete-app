import { Role } from "@prisma/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { db } from "@lib/db";
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

    const allReviews = await db.jobReview.findMany({
      orderBy: {
        order: "desc",
      },
    });
    const highestOrderReview = allReviews[0];

    const updatedJobReview = await db.jobReview.update({
      where: { id: params.id },
      data: {
        ...reviewData,
        order:
          reviewData.order === "new"
            ? highestOrderReview.order + 1
            : parseInt(reviewData.order),
      },
    });

    const currentImages = await db.image.findMany({
      where: { jobReviewId: updatedJobReview.id },
    });
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
      await db.image.delete({
        where: { src: url },
      });
    }
    // add images
    for (const url of imagesToAdd) {
      await db.image.create({
        data: {
          src: url,
          alt: `Image for review by ${reviewData.reviewerName}`,
          jobReview: {
            connect: {
              id: updatedJobReview.id,
            },
          },
        },
      });
    }

    return new Response(JSON.stringify(updatedJobReview));
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
    await db.image.deleteMany({
      where: { jobReviewId: params.id },
    });
    const deletedReview = await db.jobReview.delete({
      where: { id: params.id },
    });

    return new Response(JSON.stringify(deletedReview));
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
