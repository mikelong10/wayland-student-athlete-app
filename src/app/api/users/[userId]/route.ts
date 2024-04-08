import { db } from "@db";
import { users } from "@db/schema/auth";
import { and, desc, eq, ne } from "drizzle-orm";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import { formatPhoneNumberForServer } from "@lib/utils";

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

const userEditSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const user = await getCurrentUser();

    const body = await req.json();
    const payload = userEditSchema.parse(body);

    // if this is a request to edit a user's role
    if (payload.role) {
      if (!user || user.role !== Role.ADMIN) {
        return new Response(null, {
          status: StatusCodes.FORBIDDEN,
          statusText: ReasonPhrases.FORBIDDEN,
        });
      }

      const userToUpdate = await db
        .select()
        .from(users)
        .where(eq(users.id, params.userId));
      const allOtherAdmins = await db
        .select()
        .from(users)
        .where(and(eq(users.role, Role.ADMIN), ne(users.id, user.id)))
        .orderBy(desc(users.createdAt));

      // as long as there will be at least 1 admin left after this change, allow it
      if (
        userToUpdate &&
        !(
          allOtherAdmins.length < 1 &&
          userToUpdate[0].role === Role.ADMIN &&
          payload.role !== Role.ADMIN
        )
      ) {
        const updatedUser = await db
          .update(users)
          .set({ role: payload.role })
          .where(eq(users.id, params.userId))
          .returning();

        return new Response(JSON.stringify(updatedUser[0]));
      } else {
        return new Response(
          "Invalid request. You are currently the only admin, and there must be at least 1 admin remaining.",
          {
            status: StatusCodes.METHOD_NOT_ALLOWED,
            statusText: ReasonPhrases.METHOD_NOT_ALLOWED,
          }
        );
      }
      // if this is a request to edit a user's name or phone number
    } else if ((payload.firstName && payload.lastName) || payload.phone) {
      // invalid if the user is not logged in or the user is not the user they are trying to edit
      if (!user || user.id !== params.userId) {
        return new Response(null, {
          status: StatusCodes.UNAUTHORIZED,
          statusText: ReasonPhrases.UNAUTHORIZED,
        });
      }
      // find the user they are trying to edit
      const userToUpdate = (
        await db.select().from(users).where(eq(users.id, params.userId))
      ).pop();
      // invalid if the user was not found or the emails do not match
      if (!userToUpdate || user.email !== userToUpdate?.email) {
        return new Response(null, {
          status: StatusCodes.UNAUTHORIZED,
          statusText: ReasonPhrases.UNAUTHORIZED,
        });
      }
      // formulate data to update
      const dataToUpdate: { name?: string; phone?: string } = {};
      if (payload.firstName && payload.lastName) {
        dataToUpdate["name"] = `${payload.firstName} ${payload.lastName}`;
      }
      if (payload.phone) {
        const updatedPhone = formatPhoneNumberForServer(payload.phone);
        dataToUpdate["phone"] = updatedPhone;
      }
      // update the user
      const updatedUser = await db
        .update(users)
        .set(dataToUpdate)
        .where(eq(users.id, params.userId))
        .returning();
      return new Response(JSON.stringify(updatedUser[0]));
    }
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
