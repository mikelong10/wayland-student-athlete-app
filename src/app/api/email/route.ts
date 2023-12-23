import { ReasonPhrases, StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
import { z } from "zod";

import { requestJobFormSchema } from "@lib/schemas";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const requestedJobBody = requestJobFormSchema.parse(json);

    console.log("EMAIL REQUEST BODY", requestedJobBody);
    const message = `NEW JOB ALERT!\nFrom: ${requestedJobBody.adultFirstName} ${requestedJobBody.adultLastName}\nDescription: ${requestedJobBody.description}\nContact: ${requestedJobBody.contact}`;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const emailHTML = (job: z.infer<typeof requestJobFormSchema>) => {
      return `
        <h2>Name</h2>
        <h3>Adult's Name</h3>
        <p>${job.adultFirstName} ${job.adultLastName}</p>
        ${
          job.childFirstName
            ? `<h3>Child's Name</h3><p>${job.childFirstName} ${job.childLastName}</p>`
            : ""
        }
        <h2>Job Info</h2>
        <h3>Description</h3>
        <p>${job.description}</p>
        <h3>Address</h3>
        <p>${job.location}</p>
        <h3>Time</h3>
        <p>${job.time}</p>
        <h3>Estimate</h3>
        <p>${job.estimate}</p>
        <h2>Contact</h2>
        <h3>Contact Info</h3>
        <p>${job.contact}</p>
        <h3>Source</h3>
        <p>${job.learn}</p>
        <h3>Special Requests</h3>
        <p>${job.special}</p>
        <h3>Electronic Signature</h3>
        <p>${job.signature}</p>
        `;
    };
    const notification = await transporter.sendMail({
      from: process.env.EMAIL_SERVER_USER,
      to: process.env.EMAIL_SERVER_USER,
      subject: "🔔🔔🔔 NEW JOB REQUEST 🔔🔔🔔",
      text: message,
      html: emailHTML(requestedJobBody),
    });

    return new Response(JSON.stringify(notification));
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
