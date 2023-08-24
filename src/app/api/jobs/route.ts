import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import { requestJobFormSchema } from "@lib/types";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    const json = await req.json();
    const body = requestJobFormSchema.parse(json);

    if (!user) {
      const newJob = await db.job.create({
        data: body,
      });
      console.log("Created new job WITHOUT user:", newJob);
      return new Response(JSON.stringify(newJob), {
        status: StatusCodes.CREATED,
        statusText: ReasonPhrases.CREATED,
      });
    }
    const newJob = await db.job.create({
      data: {
        ...body,
        requestorId: user.id,
      },
    });
    console.log("Created new job WITH user:", newJob);
    return new Response(JSON.stringify(newJob), {
      status: StatusCodes.CREATED,
      statusText: ReasonPhrases.CREATED,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        statusText: ReasonPhrases.UNPROCESSABLE_ENTITY,
      });
    }

    return new Response(null, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
}
