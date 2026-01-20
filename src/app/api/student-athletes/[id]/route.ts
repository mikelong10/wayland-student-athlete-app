import { db } from "@db";
import {
  studentAthleteProfiles,
  studentAthleteResumeItems,
} from "@db/schema/content";
import { Role } from "@lib/enums";
import { studentAthleteProfileFormSchema } from "@lib/schemas";
import { getCurrentUser } from "@lib/session";
import { nameToSlug } from "@lib/utils";
import { eq } from "drizzle-orm";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

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

    const updatedStudentAthleteProfile = await db
      .update(studentAthleteProfiles)
      .set({
        ...profileData,
        name: `${firstName} ${lastName}`,
        graduationYear: parseInt(graduationYear, 10),
        slug: nameToSlug(`${firstName} ${lastName}`),
      })
      .where(eq(studentAthleteProfiles.id, params.id))
      .returning();

    const currentResumeItems = await db
      .select()
      .from(studentAthleteResumeItems)
      .where(
        eq(
          studentAthleteResumeItems.studentAthleteId,
          updatedStudentAthleteProfile[0].id
        )
      );
    const newResumeItemTexts = resumeItems.map((item) => item.text) ?? [];
    // all current resume items that are not in the new list
    const resumeItemsToDelete = currentResumeItems.filter(
      (item) => !newResumeItemTexts.includes(item.text)
    );
    // all new resume items that are not in the current list
    const resumeItemsToAdd = newResumeItemTexts.filter(
      (text) => !currentResumeItems.map((item) => item.text).includes(text)
    );
    // delete resumeItems
    for (const item of resumeItemsToDelete) {
      await db
        .delete(studentAthleteResumeItems)
        .where(eq(studentAthleteResumeItems.id, item.id));
    }
    // add resumeItems
    for (const text of resumeItemsToAdd) {
      await db.insert(studentAthleteResumeItems).values({
        text: text,
        studentAthleteId: updatedStudentAthleteProfile[0].id,
      });
    }

    return new Response(JSON.stringify(updatedStudentAthleteProfile[0]));
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
    await db
      .delete(studentAthleteResumeItems)
      .where(eq(studentAthleteResumeItems.studentAthleteId, params.id));
    const deletedProfile = await db
      .delete(studentAthleteProfiles)
      .where(eq(studentAthleteProfiles.id, params.id))
      .returning();

    return new Response(JSON.stringify(deletedProfile[0]));
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
