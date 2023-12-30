import { Role } from "@prisma/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { db } from "@lib/db";
import { studentAthleteProfileFormSchema } from "@lib/schemas";
import { getCurrentUser } from "@lib/session";
import { nameToSlug } from "@lib/utils";

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
      return new Response("Only Admins can edit student-athlete profiles", {
        status: StatusCodes.FORBIDDEN,
        statusText: ReasonPhrases.FORBIDDEN,
      });
    }

    const { params } = routeContextSchema.parse(context);
    const json = await req.json();
    const updateProfileRequestBody =
      studentAthleteProfileFormSchema.parse(json);

    const { graduationYear, firstName, lastName, resumeItems, ...profileData } =
      updateProfileRequestBody;

    const updatedStudentAthleteProfile = await db.studentAthleteProfile.update({
      where: { id: params.id },
      data: {
        ...profileData,
        name: `${firstName} ${lastName}`,
        graduationYear: parseInt(graduationYear),
        slug: nameToSlug(`${firstName} ${lastName}`),
      },
    });

    // delete all current resume items
    await db.studentAthleteResumeItem.deleteMany({
      where: { studentAthleteId: updatedStudentAthleteProfile.id },
    });
    // create new resume list
    for (const resumeItem of resumeItems) {
      await db.studentAthleteResumeItem.create({
        data: {
          ...resumeItem,
          studentAthleteId: updatedStudentAthleteProfile.id,
        },
      });
    }

    return new Response(JSON.stringify(updatedStudentAthleteProfile), {
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
    console.log("Error in PATCH /api/student-athletes/id", error);
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
      return new Response("Only Admins can delete student-athlete profiles", {
        status: StatusCodes.FORBIDDEN,
        statusText: ReasonPhrases.FORBIDDEN,
      });
    }

    const { params } = routeContextSchema.parse(context);
    await db.studentAthleteResumeItem.deleteMany({
      where: { studentAthleteId: params.id },
    });
    const deletedProfile = await db.studentAthleteProfile.delete({
      where: { id: params.id },
    });

    return new Response(JSON.stringify(deletedProfile));
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
