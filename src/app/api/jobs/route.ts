import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { db } from "@lib/db";
import { requestJobFormSchema } from "@lib/schemas";
import { getCurrentUser } from "@lib/session";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    const json = await req.json();
    const jobRequestBody = requestJobFormSchema.parse(json);

    // initialize auth
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID ?? "",
      serviceAccountAuth
    );
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[1]; // get job requests sheet
    // append row to google sheet
    await sheet.addRow(jobRequestBody);

    // create job for non-logged in users
    if (!user) {
      const newJob = await db.job.create({
        data: jobRequestBody,
      });

      return new Response(JSON.stringify(newJob), {
        status: StatusCodes.CREATED,
        statusText: ReasonPhrases.CREATED,
      });
    }
    // create job for logged in users
    const newJob = await db.job.create({
      data: {
        ...jobRequestBody,
        requestorId: user.id,
      },
    });

    return new Response(JSON.stringify(newJob), {
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
    console.log("Error in POST /api/jobs", error);
    const err = error as Error;
    return new Response(JSON.stringify(err), {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
}
