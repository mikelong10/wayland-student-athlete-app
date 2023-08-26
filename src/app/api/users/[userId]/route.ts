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

const userRoleSchema = z.object({
  role: z.nativeEnum(Role),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const user = await getCurrentUser();
    if (!user || user.role !== Role.ADMIN) {
      return new Response(null, {
        status: StatusCodes.FORBIDDEN,
        statusText: ReasonPhrases.FORBIDDEN,
      });
    }

    const body = await req.json();
    const payload = userRoleSchema.parse(body);

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
