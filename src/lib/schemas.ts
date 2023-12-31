import { z } from "zod";

import { phoneRegex } from "@lib/utils";

export const emailLoginSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email")
    .min(1, "Please enter your email"),
});
export type EmailLoginFormValues = z.infer<typeof emailLoginSchema>;

export const editUserNameSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .refine((data) => data.firstName && data.lastName, {
    message: "Please provide both first and last name",
    path: ["lastName"],
  });
export type EditUserNameFormValues = z.infer<typeof editUserNameSchema>;

export const editUserPhoneSchema = z.object({
  phone: z.string().regex(phoneRegex, "Please enter a vaild US phone number"),
});
export type EditUserPhoneFormValues = z.infer<typeof editUserPhoneSchema>;

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
export type RequestJobFormValues = z.infer<typeof requestJobFormSchema>;

export const reviewFormSchema = z.object({
  reviewerName: z.string().min(1, "Required"),
  reviewBlurb: z.string().min(1, "Required"),
  reviewText: z.string().min(1, "Required"),
  reviewImages: z.array(z.string()).optional(),
  order: z.string().min(1, "Required"),
});
export type ReviewFormValues = z.infer<typeof reviewFormSchema>;

export const studentAthleteProfileFormSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  graduationYear: z.string().min(1, "Required"),
  resumeItems: z
    .array(z.object({ text: z.string().min(1, "Cannot be empty") }))
    .min(1, "Add some resume items"),
  displayImage: z.string(),
});
export type StudentAthleteProfileFormValues = z.infer<
  typeof studentAthleteProfileFormSchema
>;

export const jobCompleteFormSchema = z.object({
  client: z.string().min(1, "Required"),
  jobType: z.string().min(1, "Required"),
  cost: z.string().min(1, "Required"),
  timeTaken: z.string().min(1, "Required"),
  cutTaken: z.string().min(1, "Required"),
  completedBy: z.string().min(1, "Required"),
});
export type JobCompleteFormValues = z.infer<typeof jobCompleteFormSchema>;

export const completeJobGoogleSheetSchema = z.object({
  client: z.string().min(1, "Required"),
  jobType: z.string().min(1, "Required"),
  numPeople: z.string().min(1, "Required"),
  cost: z.string().min(1, "Required"),
  timeTaken: z.string().min(1, "Required"),
  cutTaken: z.string().min(1, "Required"),
  manHours: z.string().min(1, "Required"),
  completedBy: z.string().min(1, "Required"),
});
export type CompleteJobGoogleSheetValues = z.infer<
  typeof completeJobGoogleSheetSchema
>;
