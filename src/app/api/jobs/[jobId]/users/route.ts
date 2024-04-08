import { db } from "@db";
import { users } from "@db/schema/auth";
import { jobAssignments } from "@db/schema/jobs";
import { and, eq } from "drizzle-orm";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";

const routeContextSchema = z.object({
  params: z.object({
    jobId: z.string(),
  }),
});

const toggleAssignSchema = z.object({
  userId: z.string(),
});

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const body = await req.json();
    const payload = toggleAssignSchema.parse(body);

    const assignee = (
      await db.select().from(users).where(eq(users.id, payload.userId))
    ).pop();

    const user = await getCurrentUser();
    // if the user is not an admin/SA or the assignee is not an admin/SA
    if (
      !user ||
      (user.role !== Role.ADMIN && user.role !== Role.STUDENT_ATHLETE) ||
      (assignee &&
        assignee.role !== Role.ADMIN &&
        assignee.role !== Role.STUDENT_ATHLETE)
    ) {
      return new Response(null, {
        status: StatusCodes.FORBIDDEN,
        statusText: ReasonPhrases.FORBIDDEN,
      });
    }

    // updating the job assignee
    if (assignee?.id) {
      const newAssignment = await db
        .insert(jobAssignments)
        .values({
          jobId: params.jobId,
          userId: assignee.id,
          assignedBy: user.id,
        })
        .returning();
      return new Response(JSON.stringify(newAssignment[0]));
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

    const unassignee = (
      await db.select().from(users).where(eq(users.id, payload.userId))
    ).pop();

    const user = await getCurrentUser();
    // if the user is not an admin/SA
    if (
      !user ||
      (user.role !== Role.ADMIN && user.role !== Role.STUDENT_ATHLETE)
    ) {
      return new Response(null, {
        status: StatusCodes.FORBIDDEN,
        statusText: ReasonPhrases.FORBIDDEN,
      });
    }

    // removing the job assignee
    if (unassignee?.id) {
      const deletedAssignment = await db
        .delete(jobAssignments)
        .where(
          and(
            eq(jobAssignments.jobId, params.jobId),
            eq(jobAssignments.userId, unassignee.id)
          )
        )
        .returning();
      return new Response(JSON.stringify(deletedAssignment[0]));
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
