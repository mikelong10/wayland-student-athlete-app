import { Role, Status } from "@prisma/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";

const routeContextSchema = z.object({
  params: z.object({
    jobId: z.string(),
  }),
});

const jobUpdateSchema = z.object({
  status: z.nativeEnum(Status).optional(),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const body = await req.json();
    const payload = jobUpdateSchema.parse(body);

    const user = await getCurrentUser();
    // if the user is not an admin/SA
    if (
      !user ||
      (user.role !== Role.ADMIN && user.role !== Role.STUDENTATHLETE)
    ) {
      return new Response(null, {
        status: StatusCodes.FORBIDDEN,
        statusText: ReasonPhrases.FORBIDDEN,
      });
    }

    // if updating the job status
    if (payload.status) {
      const updatedJob = await db.job.update({
        where: {
          id: params.jobId,
        },
        data: {
          status: payload.status,
        },
      });
      return new Response(JSON.stringify(updatedJob));
    }

    return new Response("Unsupported request", {
      status: StatusCodes.NOT_ACCEPTABLE,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        statusText: ReasonPhrases.UNPROCESSABLE_ENTITY,
      });
    }

    return new Response(null, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}
