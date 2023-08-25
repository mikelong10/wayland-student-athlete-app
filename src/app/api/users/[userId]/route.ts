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
    if (!user || user.role !== "ADMIN") {
      return new Response(null, {
        status: StatusCodes.FORBIDDEN,
        statusText: ReasonPhrases.FORBIDDEN,
      });
    }

    const body = await req.json();
    const payload = userRoleSchema.parse(body);

    const updatedUser = await db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        role: payload.role,
      },
    });

    return new Response(JSON.stringify(updatedUser), {
      status: StatusCodes.OK,
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
