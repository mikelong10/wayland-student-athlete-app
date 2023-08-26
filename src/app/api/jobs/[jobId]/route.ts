import { Role } from "@prisma/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";

const routeContextSchema = z.object({
  params: z.object({
    jobId: z.string(),
  }),
});

const assigneeSchema = z.object({
  assignee: z.object({
    id: z.string(),
    role: z.nativeEnum(Role),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const body = await req.json();
    const payload = assigneeSchema.parse(body);

    const user = await getCurrentUser();
    if (
      !user ||
      (user.role !== Role.ADMIN && user.role !== Role.STUDENTATHLETE) ||
      (payload.assignee.role !== Role.ADMIN &&
        payload.assignee.role !== Role.STUDENTATHLETE)
    ) {
      return new Response(null, {
        status: StatusCodes.FORBIDDEN,
        statusText: ReasonPhrases.FORBIDDEN,
      });
    }

    const updatedJob = await db.job.update({
      where: {
        id: params.jobId,
      },
      data: {
        assigneeId: payload.assignee.id,
      },
    });
    return new Response(JSON.stringify(updatedJob));
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
