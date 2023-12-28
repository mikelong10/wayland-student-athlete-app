import { Role } from "@prisma/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { db } from "@lib/db";
import { addReviewFormSchema } from "@lib/schemas";
import { getCurrentUser } from "@lib/session";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== Role.ADMIN) {
      return new Response("Only Admins can add reviews", {
        status: StatusCodes.FORBIDDEN,
        statusText: ReasonPhrases.FORBIDDEN,
      });
    }

    const json = await req.json();
    const addReviewRequestBody = addReviewFormSchema.parse(json);

    const allReviews = await db.jobReview.findMany({
      orderBy: {
        order: "desc",
      },
    });
    if (allReviews.length === 0) {
      const { reviewImages, ...reviewData } = addReviewRequestBody;
      const newReview = await db.jobReview.create({
        data: {
          ...reviewData,
          order: 1,
        },
      });

      for (const url of reviewImages ?? []) {
        await db.image.create({
          data: {
            src: url,
            alt: `Image for review by ${reviewData.reviewerName}`,
            jobReview: {
              connect: {
                id: newReview.id,
              },
            },
          },
        });
      }

      return new Response(JSON.stringify(newReview), {
        status: StatusCodes.CREATED,
        statusText: ReasonPhrases.CREATED,
      });
    } else {
      const highestOrderReview = allReviews[0];

      const { reviewImages, ...reviewData } = addReviewRequestBody;

      const newReview = await db.jobReview.create({
        data: {
          ...reviewData,
          order:
            reviewData.order === "new"
              ? highestOrderReview.order + 1
              : parseInt(reviewData.order),
        },
      });

      for (const url of reviewImages ?? []) {
        await db.image.create({
          data: {
            src: url,
            alt: `Image for review by ${reviewData.reviewerName}`,
            jobReview: {
              connect: {
                id: newReview.id,
              },
            },
          },
        });
      }

      return new Response(JSON.stringify(newReview), {
        status: StatusCodes.CREATED,
        statusText: ReasonPhrases.CREATED,
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        statusText: ReasonPhrases.UNPROCESSABLE_ENTITY,
      });
    }
    console.log("Error in POST /api/jobs", error);
    const err = error as Error;
    return new Response(JSON.stringify(err), {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
}
