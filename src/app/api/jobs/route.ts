import { db } from "@db";
import { jobs } from "@db/schema/jobs";
import type { Job } from "@db/types";
import { type RequestJobFormValues, requestJobFormSchema } from "@lib/schemas";
import { getCurrentUser } from "@lib/session";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
import { z } from "zod";

async function sendToGoogleSheet(jobRequestBody: RequestJobFormValues) {
  try {
    // initialize auth
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
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
  } catch (error) {
    console.log("Failed to send new job request to Google sheet", error);
  }
}

async function sendEmailNotification(jobRequestBody: RequestJobFormValues) {
  try {
    const message = `NEW JOB ALERT!\nFrom: ${jobRequestBody.adultFirstName} ${jobRequestBody.adultLastName}\nDescription: ${jobRequestBody.description}\nContact: ${jobRequestBody.contact}`;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const emailHTML = (job: RequestJobFormValues) => {
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
        ${job.learn ? `<h3>Source</h3><p>${job.learn}</p>` : ""}
        ${job.special ? `<h3>Special Requests</h3><p>${job.special}</p>` : ""}
        <h4>Electronic Signature</h4>
        <p>${job.signature}</p>
        `;
    };
    const notification = await transporter.sendMail({
      from: process.env.EMAIL_SERVER_USER,
      to: process.env.EMAIL_SERVER_USER,
      subject: "🔔 NEW JOB REQUEST 🔔",
      text: message,
      html: emailHTML(jobRequestBody),
    });

    return new Response(JSON.stringify(notification));
  } catch (error) {
    console.log("Failed to send new job request email notification", error);
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    const json = await req.json();
    const jobRequestBody = requestJobFormSchema.parse(json);

    // create job for non-logged in users
    let newJob: Job;
    if (!user) {
      const createdJob = await db
        .insert(jobs)
        .values(jobRequestBody)
        .returning();
      newJob = createdJob[0];
    } else {
      // create job with logged in user id
      const createdJob = await db
        .insert(jobs)
        .values({
          ...jobRequestBody,
          requestorId: user.id,
        })
        .returning();
      newJob = createdJob[0];
    }

    // send job request to google sheet
    await sendToGoogleSheet(jobRequestBody);

    // send email notification
    await sendEmailNotification(jobRequestBody);

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
