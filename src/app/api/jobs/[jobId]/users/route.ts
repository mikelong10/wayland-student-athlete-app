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

const toggleAssignSchema = z.object({
  userId: z.string().optional(),
});

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const body = await req.json();
    const payload = toggleAssignSchema.parse(body);

    const assignee = await db.user.findUnique({
      where: {
        id: payload.userId,
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

    // updating the job assignee
    if (assignee?.id) {
      const newAssignment = await db.jobAssignment.create({
        data: {
          jobId: params.jobId,
          userId: assignee.id,
          assignedBy: user.id,
        },
      });
      return new Response(JSON.stringify(newAssignment));
    }

    return new Response(null, {
      status: StatusCodes.BAD_REQUEST,
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

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const body = await req.json();
    const payload = toggleAssignSchema.parse(body);

    const unassignee = await db.user.findUnique({
      where: {
        id: payload.userId,
      },
    });
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

    // removing the job assignee
    if (unassignee?.id) {
      const deletedAssignment = await db.jobAssignment.delete({
        where: {
          jobId_userId: {
            jobId: params.jobId,
            userId: unassignee.id,
          },
        },
      });
      return new Response(JSON.stringify(deletedAssignment));
    }

    return new Response(null, {
      status: StatusCodes.BAD_REQUEST,
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
