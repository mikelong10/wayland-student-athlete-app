import { db } from "@db";
import {
  studentAthleteProfiles,
  studentAthleteResumeItems,
} from "@db/schema/content";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { Role } from "@lib/enums";
import { studentAthleteProfileFormSchema } from "@lib/schemas";
import { getCurrentUser } from "@lib/session";
import { nameToSlug } from "@lib/utils";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== Role.ADMIN) {
      return new Response("Only Admins can add student-athlete profiles", {
        status: StatusCodes.FORBIDDEN,
        statusText: ReasonPhrases.FORBIDDEN,
      });
    }

    const json = await req.json();
    const addProfileRequestBody = studentAthleteProfileFormSchema.parse(json);

    const { graduationYear, firstName, lastName, resumeItems, ...profileData } =
      addProfileRequestBody;

    const newStudentAthleteProfile = await db
      .insert(studentAthleteProfiles)
      .values({
        ...profileData,
        name: `${firstName} ${lastName}`,
        graduationYear: parseInt(graduationYear),
        slug: nameToSlug(`${firstName} ${lastName}`),
      })
      .returning();

    for (const resumeItem of resumeItems) {
      await db.insert(studentAthleteResumeItems).values({
        ...resumeItem,
        studentAthleteId: newStudentAthleteProfile[0].id,
      });
    }

    return new Response(JSON.stringify(newStudentAthleteProfile[0]), {
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
    console.log("Error in POST /api/student-athletes", error);
    const err = error as Error;
    return new Response(JSON.stringify(err), {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
}
