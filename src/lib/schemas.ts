import { z } from "zod";

export const editProfileFormSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .refine((data) => data.firstName && data.lastName, {
    message: "Please provide both first and last name",
    path: ["lastName"],
  });

export const requestJobFormSchema = z.object({
  adultFirstName: z.string().min(1, "Required"),
  adultLastName: z.string().min(1, "Required"),
  childFirstName: z.string().optional(),
  childLastName: z.string().optional(),
  description: z.string().min(1, "Required"),
  location: z.string().min(1, "Required"),
  time: z.string().min(1, "Required"),
  estimate: z.string().min(1, "Required"),
  contact: z.string().min(1, "Required"),
  learn: z.string().optional(),
  special: z.string().optional(),
  signature: z.string().min(1, "Required"),
});
