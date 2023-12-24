import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { completeJobGoogleSheetSchema } from "@lib/schemas";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const jobCompleteBody = completeJobGoogleSheetSchema.parse(json);

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

    const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`

    // append rows
    const { completedBy, ...rest } = jobCompleteBody;
    const newRow = Object.values(rest).concat(completedBy.split(", "));
    await sheet.addRow(newRow);

    return new Response();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        statusText: ReasonPhrases.UNPROCESSABLE_ENTITY,
      });
    }

    return new Response(JSON.stringify(error), {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
}
