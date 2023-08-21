"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@components/ui/textarea";
import { Separator } from "@components/ui/separator";

const requestJobFormSchema = z.object({
  adultFirstName: z.string().nonempty("This field is required"),
  adultLastName: z.string().nonempty("This field is required"),
  childFirstName: z.string().optional(),
  childLastName: z.string().optional(),
  description: z.string().nonempty("This field is required"),
  location: z.string().nonempty("This field is required"),
  time: z.string().nonempty("This field is required"),
  contact: z.string().nonempty("This field is required"),
  frequency: z.string().nonempty("This field is required"),
  learn: z.string().nonempty("This field is required"),
  special: z.string().nonempty("This field is required"),
  signature: z.string().nonempty("This field is required"),
});

type RequestJobFormValues = z.infer<typeof requestJobFormSchema>;

export default function ProfileForm() {
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
      frequency: "",
      learn: "",
      special: "",
      signature: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: RequestJobFormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className="flex flex-col md:items-center gap-4 h-full sm:max-w-[768px] lg:max-w-[960px] py-24 px-6 md:px-10 lg:px-16 xl:px-24">
      <h1 className="scroll-m-20 w-full text-4xl font-extrabold text-left tracking-tight lg:text-5xl">
        Request a job
      </h1>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold tracking-tight">
              Adult's name
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
              <FormField
                control={form.control}
                name="adultFirstName"
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
                name="adultLastName"
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
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold tracking-tight">
                Child's name
              </h2>
              <FormDescription>
                {"(if applicable for tutoring, sports/music lesson, etc.)"}
              </FormDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
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
          <Separator />
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold tracking-tight">Job info</h2>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you want done?</FormLabel>
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
                  <FormLabel>Where should we come for the job?</FormLabel>
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
                  <FormLabel>When do you need the job done?</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Let us know a time and date that works best for you!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Would you like this to be a repeated job?
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    {"(ex: daily, weekly, every Tues and Thurs)"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold tracking-tight">Contact</h2>
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's the best way to reach you?</FormLabel>
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
          <Separator />
          <div>
            <FormField
              control={form.control}
              name="signature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    I understand that Wayland Student-Athlete and its
                    constituents are not liable for any injuries or damages that
                    may occur.
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
          <Button type="submit" variant={"secondary"} size={'lg'} className="text-md rounded-full">
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
