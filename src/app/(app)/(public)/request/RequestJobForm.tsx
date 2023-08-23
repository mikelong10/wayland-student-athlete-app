"use client";

import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Separator } from "@components/ui/separator";
import { Textarea } from "@components/ui/textarea";
import { requestJobFormSchema } from "@lib/types";

type RequestJobFormValues = z.infer<typeof requestJobFormSchema>;

export default function RequestJobForm({
  setRequestSent,
}: {
  setRequestSent: Dispatch<SetStateAction<boolean>>;
}) {
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
      contact: "",
      learn: "",
      special: "",
      signature: "",
    },
  });

  async function onSubmit(values: RequestJobFormValues) {
    console.log(values);

    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    console.log("Job created response:", response);
    setRequestSent(true);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium tracking-tight">Name</h3>
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
        <Separator className="bg-secondary rounded-full" />
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Job info</h2>
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
        </div>
        <Separator className="bg-secondary rounded-full" />
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What&apos;s the best way to reach you? *</FormLabel>
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
                <FormLabel>How did you hear about us? *</FormLabel>
                <FormDescription>{"We would love to know :)"}</FormDescription>
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
        <Separator className="bg-secondary rounded-full" />
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
        <Button type="submit" size={"lg"} className="text-md rounded-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
