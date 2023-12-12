"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { requestJobFormSchema } from "@lib/types";
import { cn } from "@lib/utils";
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

type RequestJobFormValues = z.infer<typeof requestJobFormSchema>;

export default function RequestJobForm({
  setRequestSent,
}: {
  setRequestSent: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RequestJobFormValues>({
    resolver: zodResolver(requestJobFormSchema),
    defaultValues: {
      adultFirstName: "",
      adultLastName: "",
      childFirstName: "",
      childLastName: "",
      description: "",
      location: "",
      time: "",
      estimate: "",
      contact: "",
      learn: "",
      special: "",
      signature: "",
    },
  });

  async function onSubmit(values: RequestJobFormValues) {
    setIsSubmitting(true);

    toast({
      title: "Sending your job request...",
      description: "Hope you're having a great day today!",
    });

    try {
      const createJobResponse = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const createJobResponseBody = await createJobResponse.json();

      await fetch("/api/twilio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createJobResponseBody),
      });

      toast({
        title: "Thank you!",
        description: "Your job request was successfully submitted",
      });
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
        className="flex w-full flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">Name</h2>
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4">
            <FormField
              control={form.control}
              name="adultFirstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First name *</FormLabel>
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
                  <FormLabel>Last name *</FormLabel>
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
            <h3 className="text-lg font-medium tracking-tight">
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
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">Job info</h2>
          <div className="flex w-full flex-col gap-2 sm:gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you want done? *</FormLabel>
                  <FormDescription>
                    {
                      "(moving, sports/music lessons, yardwork, babysitting, car rides, projects, anything!)"
                    }
                  </FormDescription>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Where should we come for the job? *</FormLabel>
                  <FormDescription>
                    Please provide an address or location
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When do you need the job done? *</FormLabel>
                  <FormDescription>
                    {
                      "Provide a date and time or frequency (ex: weekly, monthly, every Tues and Thurs)"
                    }
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                    How long do you think the job will take? *
                  </FormLabel>
                  <FormDescription>
                    {
                      "Please provide your best estimate, but don't worry about it too much!"
                    }
                  </FormDescription>
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
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <div className="flex w-full flex-col gap-2 sm:gap-4">
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    What&apos;s the best way to reach you? *
                  </FormLabel>
                  <FormDescription>
                    Please provide us a phone number, email, etc!
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                  <FormDescription>
                    {"We would love to know :)"}
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                  are not liable for any injuries or damages that may occur. *
                </FormLabel>
                <FormDescription>Electronic signature</FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size={"lg"}
          className={cn(
            "text-md rounded-full",
            isSubmitting ? "bg-primary/70" : ""
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
