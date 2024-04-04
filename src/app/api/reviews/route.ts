import { db } from "@db";
import { jobReviewImages, jobReviews } from "@db/schema/content";
import { desc } from "drizzle-orm";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { Role } from "@lib/enums";
import { reviewFormSchema } from "@lib/schemas";
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
    const addReviewRequestBody = reviewFormSchema.parse(json);

    const allReviews = await db
      .select()
      .from(jobReviews)
      .orderBy(desc(jobReviews.order));

    if (allReviews.length === 0) {
      const { reviewImages, ...reviewData } = addReviewRequestBody;
      const newReview = await db
        .insert(jobReviews)
        .values({
          ...reviewData,
          order: 1,
        })
        .returning({ id: jobReviews.id });

      for (const url of reviewImages ?? []) {
        await db.insert(jobReviewImages).values({
          src: url,
          alt: `Image for review by ${reviewData.reviewerName}`,
          jobReviewId: newReview[0].id,
        });
      }

      return new Response(JSON.stringify(newReview), {
        status: StatusCodes.CREATED,
        statusText: ReasonPhrases.CREATED,
      });
    } else {
      const highestOrderReview = allReviews[0];

      const { reviewImages, ...reviewData } = addReviewRequestBody;

      const newReview = await db
        .insert(jobReviews)
        .values({
          ...reviewData,
          order:
            reviewData.order === "new"
              ? highestOrderReview.order + 1
              : parseInt(reviewData.order),
        })
        .returning({ id: jobReviews.id });

      for (const url of reviewImages ?? []) {
        await db.insert(jobReviewImages).values({
          src: url,
          alt: `Image for review by ${reviewData.reviewerName}`,
          jobReviewId: newReview[0].id,
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
