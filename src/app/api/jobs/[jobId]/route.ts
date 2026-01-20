import { db } from "@db";
import { jobAssignments, jobs } from "@db/schema/jobs";
import { Role, Status } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import { eq } from "drizzle-orm";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

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
      (user.role !== Role.ADMIN && user.role !== Role.STUDENT_ATHLETE)
    ) {
      return new Response(null, {
        status: StatusCodes.FORBIDDEN,
        statusText: ReasonPhrases.FORBIDDEN,
      });
    }

    // if updating the job status
    if (payload.status) {
      // const updatedJob = await db.job.update({
      //   where: {
      //     id: params.jobId,
      //   },
      //   data: {
      //     status: payload.status,
      //   },
      // });
      const updatedJob = await db
        .update(jobs)
        .set({ status: payload.status })
        .where(eq(jobs.id, params.jobId))
        .returning();

      return new Response(JSON.stringify(updatedJob[0]));
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

export async function DELETE(
  _req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== Role.ADMIN) {
      return new Response("Only Admins can delete jobs", {
        status: StatusCodes.FORBIDDEN,
        statusText: ReasonPhrases.FORBIDDEN,
      });
    }

    const { params } = routeContextSchema.parse(context);
    // delete all job assignments for the job
    await db
      .delete(jobAssignments)
      .where(eq(jobAssignments.jobId, params.jobId));
    const deletedJob = await db
      .delete(jobs)
      .where(eq(jobs.id, params.jobId))
      .returning();

    return new Response(JSON.stringify(deletedJob[0]));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        statusText: ReasonPhrases.UNPROCESSABLE_ENTITY,
      });
    }
    console.log("Error in DELETE /api/jobs/id", error);
    const err = error as Error;
    return new Response(JSON.stringify(err), {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
}
