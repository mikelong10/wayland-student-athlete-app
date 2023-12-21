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
  assigneeId: z.string().optional(),
  assignerRole: z.nativeEnum(Role).optional(),
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

    const assignee = await db.user.findUnique({
      where: {
        id: payload.assigneeId,
      },
    });
    const user = await getCurrentUser();
    // if the user is not an admin/SA or the assignee is not an admin/SA
    if (
      !user ||
      (user.role !== Role.ADMIN && user.role !== Role.STUDENTATHLETE) ||
      (assignee &&
        assignee.role !== Role.ADMIN &&
        assignee.role !== Role.STUDENTATHLETE)
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

    // if updating the job assignee
    if (payload.assigneeId) {
      const newAssignment = await db.jobAssignment.create({
        data: {
          jobId: params.jobId,
          userId: payload.assigneeId,
          assignedBy: user.id,
        },
      });
      return new Response(JSON.stringify(newAssignment));
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
