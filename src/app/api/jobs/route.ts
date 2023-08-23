import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import { requestJobFormSchema } from "@lib/types";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    const json = await req.json();
    const body = requestJobFormSchema.parse(json);

    if (!user) {
      const newJob = await db.job.create({
        data: body,
      });
      console.log("Created new job WITHOUT user:", newJob);
      return NextResponse.json(newJob);
    }
    const newJob = await db.job.create({
      data: {
        ...body,
        requestorId: user.id,
      },
    });
    console.log("Created new job WITH user:", newJob);
    return NextResponse.json(newJob);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
