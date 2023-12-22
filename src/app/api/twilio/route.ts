import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Twilio } from "twilio";
import { z } from "zod";

import { requestJobFormSchema } from "@lib/schemas";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const requestedJobBody = requestJobFormSchema.parse(json);

    console.log("TWILIO REQUEST BODY", requestedJobBody);
    const message = `\nNEW JOB ALERT!\nFrom: ${requestedJobBody.adultFirstName} ${requestedJobBody.adultLastName}\nDescription: ${requestedJobBody.description}\nContact: ${requestedJobBody.contact}`;

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
    const myNumber = process.env.MY_NUMBER;

    if (accountSid && authToken && twilioNumber && myNumber) {
      const client = new Twilio(accountSid, authToken);
      const twilioResponse = await client.messages.create({
        from: twilioNumber,
        to: myNumber,
        body: message,
      });
      console.log("SMS successfully sent:", twilioResponse);
      return new Response(JSON.stringify(twilioResponse), { status: 200 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        statusText: ReasonPhrases.UNPROCESSABLE_ENTITY,
      });
    }

    return new Response("Internal Server Error: SMS failed to send", {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
}
