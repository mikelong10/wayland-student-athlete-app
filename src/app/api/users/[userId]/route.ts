import { Role } from "@prisma/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

const userEditSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
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

      const userToUpdate = await db.user.findUnique({
        where: {
          id: params.userId,
        },
      });
      const allOtherAdmins = await db.user.findMany({
        where: {
          role: Role.ADMIN,
          NOT: {
            id: {
              equals: user.id,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      // as long as there will be at least 1 admin left after this change, allow it
      if (
        userToUpdate &&
        !(
          allOtherAdmins.length < 1 &&
          userToUpdate.role === Role.ADMIN &&
          payload.role !== Role.ADMIN
        )
      ) {
        const updatedUser = await db.user.update({
          where: {
            id: params.userId,
          },
          data: {
            role: payload.role,
          },
        });

        return new Response(JSON.stringify(updatedUser));
      } else {
        return new Response(
          "Invalid request. You are currently the only admin, and there must be at least 1 admin remaining.",
          {
            status: StatusCodes.METHOD_NOT_ALLOWED,
            statusText: ReasonPhrases.METHOD_NOT_ALLOWED,
          }
        );
      }
      // if this is a request to edit a user's name
    } else if (payload.firstName && payload.lastName) {
      // invalid if the user is not logged in or the user is not the user they are trying to edit
      if (!user || user.id !== params.userId) {
        return new Response(null, {
          status: StatusCodes.UNAUTHORIZED,
          statusText: ReasonPhrases.UNAUTHORIZED,
        });
      }
      // find the user they are trying to edit
      const userToUpdate = await db.user.findUnique({
        where: {
          id: params.userId,
        },
      });
      // invalid if the user was not found or the emails do not match
      if (!userToUpdate || user.email !== userToUpdate?.email) {
        return new Response(null, {
          status: StatusCodes.UNAUTHORIZED,
          statusText: ReasonPhrases.UNAUTHORIZED,
        });
      }
      // update the user's name
      const updatedUser = await db.user.update({
        where: {
          id: params.userId,
        },
        data: {
          name: `${payload.firstName} ${payload.lastName}`,
        },
      });
      return new Response(JSON.stringify(updatedUser));
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
