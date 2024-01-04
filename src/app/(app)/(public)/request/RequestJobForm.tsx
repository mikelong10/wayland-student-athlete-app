"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { requestJobFormSchema, RequestJobFormValues } from "@lib/schemas";
import { cn, formatPhoneNumberForClient, scrollToTop } from "@lib/utils";
import H2 from "@components/typography/h2";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { useToast } from "@components/ui/use-toast";

export default function RequestJobForm({
  user,
  setRequestSent,
}: {
  user?: User;
  setRequestSent: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [firstName, lastName] =
    user && user.name ? user.name.split(" ", 2) : ["", ""];
  const defaultValues = {
    adultFirstName: firstName,
    adultLastName: lastName,
    childFirstName: "",
    childLastName: "",
    description: "",
    location: "",
    time: "",
    estimate: "",
    contact: user
      ? user.phone
        ? formatPhoneNumberForClient(user.phone)
        : user.email ?? ""
      : "",
    learn: "",
    special: "",
    signature: "",
  };

  const form = useForm<RequestJobFormValues>({
    resolver: zodResolver(requestJobFormSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: RequestJobFormValues) {
    setIsSubmitting(true);

    try {
      const createJobResponse = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const createJobResponseBody = await createJobResponse.json();

      // send email notification with nodemailer
      await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createJobResponseBody),
      });

      // // send text notification through Twilio
      // await fetch("/api/twilio", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(createJobResponseBody),
      // });

      scrollToTop();
      setRequestSent(true);
    } catch {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 flex w-full flex-col gap-8"
      >
        <div className="flex flex-col gap-4">
          <H2>Name</H2>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-accent-foreground text-lg font-medium tracking-tight">
                Adult&apos;s name
              </h3>
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4">
                <FormField
                  control={form.control}
                  name="adultFirstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        First name <span className="text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="adultLastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Last name <span className="text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <h3 className="text-accent-foreground text-lg font-medium tracking-tight">
                  Child&apos;s name
                </h3>
                <FormDescription>
                  {"(if applicable for tutoring, sports/music lesson, etc.)"}
                </FormDescription>
              </div>
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4">
                <FormField
                  control={form.control}
                  name="childFirstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="childLastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <H2>Job Info</H2>
          <div className="flex w-full flex-col gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    What do you want done?{" "}
                    <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    {
                      "(moving, sports/music lessons, yardwork, babysitting, car rides, projects, anything!)"
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Where should we come for the job?{" "}
                    <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Please provide an address or location
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    When do you need the job done?{" "}
                    <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    {
                      "Provide a date and time or frequency (ex: weekly, monthly, every Tues and Thurs)"
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    How long do you think the job will take?{" "}
                    <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    {
                      "Please provide your best estimate, but don't worry about it too much!"
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <H2>Contact</H2>
          <div className="flex w-full flex-col gap-4">
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    What&apos;s the best way to reach you?{" "}
                    <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Please provide us a phone number, email, etc!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="learn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you hear about us?</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    {"We would love to know :)"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="special"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Any special questions, requests, or information?
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <FormField
            control={form.control}
            name="signature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  I understand that Wayland Student-Athlete and its constituents
                  are not liable for any injuries or damages that may occur.{" "}
                  <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Electronic signature</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size={"lg"}
          className={cn(
            "rounded-full text-lg",
            isSubmitting ? "opacity-80" : ""
          )}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
