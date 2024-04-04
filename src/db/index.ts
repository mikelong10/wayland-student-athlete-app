import * as authSchema from "@db/schema/auth";
import * as contentSchema from "@db/schema/content";
import * as jobsSchema from "@db/schema/jobs";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, {
  schema: { ...authSchema, ...jobsSchema, ...contentSchema },
});
