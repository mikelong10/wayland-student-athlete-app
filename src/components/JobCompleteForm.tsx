import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Job, User } from "@prisma/client";
import { Loader2, Table2 } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  CompleteJobGoogleSheetValues,
  jobCompleteFormSchema,
  JobCompleteFormValues,
} from "@lib/schemas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useToast } from "@components/ui/use-toast";
import { Button } from "./ui/button";

export default function JobCompleteForm({
  job,
  currentAssignees,
}: {
  job: Job;
  currentAssignees: User[];
}) {
  const { toast } = useToast();

  const [isUpdatingSheet, setIsUpdatingSheet] = useState(false);

  const completedByNames = currentAssignees.reduce((acc, assignee) => {
    if (assignee?.name) {
      acc.push(
        assignee.name.split(" ", 2).reduce((acc, name) => acc + name[0], "")
      );
    }
    return acc;
  }, [] as string[]);

  const form = useForm<JobCompleteFormValues>({
    resolver: zodResolver(jobCompleteFormSchema),
    defaultValues: {
      client: `${job.adultFirstName} ${job.adultLastName}`,
      jobType: "",
      cost: "0",
      timeTaken: "0",
      cutTaken: "0",
      completedBy: completedByNames.join(", "),
    },
  });

  async function onSubmit(values: JobCompleteFormValues) {
    setIsUpdatingSheet(true);
    try {
      const numPeople = values.completedBy.split(", ").length;
      const completedJobData: CompleteJobGoogleSheetValues = {
        ...values,
        numPeople: numPeople.toString(),
        cost: `$${values.cost}`,
        manHours: ((parseInt(values.timeTaken) * numPeople) / 60).toString(),
      };
      const response = await fetch(`/api/jobs/${job.id}/spreadsheet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completedJobData),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast({
        title: "Data successfully sent to Google Sheet!",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem syncing with Google Sheets. Please try again.",
        variant: "destructive",
      });
    }
    setIsUpdatingSheet(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"accent"} className="flex gap-2 text-xs" size={"sm"}>
          Sync
          <Table2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload job info to Google Sheet</DialogTitle>
          <DialogDescription>
            This data will populate the Google Sheet automatically!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="edit-profile-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem className="xs:grid-cols-4 grid grid-cols-5 items-center gap-4 space-y-0">
                  <FormLabel className="xs:col-span-1 col-span-2 whitespace-nowrap text-right">
                    Client
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage className="col-span-full -mt-2 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem className="xs:grid-cols-4 grid grid-cols-5 items-center gap-4 space-y-0">
                  <FormLabel className="xs:col-span-1 col-span-2 whitespace-nowrap text-right">
                    Type of job
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="col-span-3 h-fit items-center"
                    />
                  </FormControl>
                  <FormMessage className="col-span-full text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem className="xs:grid-cols-4 grid grid-cols-5 items-center gap-4 space-y-0">
                  <FormLabel className="xs:col-span-1 col-span-2 whitespace-nowrap text-right">
                    Cost ($)
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage className="col-span-full text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeTaken"
              render={({ field }) => (
                <FormItem className="xs:grid-cols-4 grid grid-cols-5 items-center gap-4 space-y-0">
                  <FormLabel className="xs:col-span-1 col-span-2 whitespace-nowrap text-right">
                    Time taken
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage className="col-span-full text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cutTaken"
              render={({ field }) => (
                <FormItem className="xs:grid-cols-4 grid grid-cols-5 items-center gap-4 space-y-0">
                  <FormLabel className="xs:col-span-1 col-span-2 whitespace-nowrap text-right">
                    Cut taken ($)
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage className="col-span-full text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="completedBy"
              render={({ field }) => (
                <FormItem className="xs:grid-cols-4 grid grid-cols-5 items-center gap-4 space-y-0">
                  <FormLabel className="xs:col-span-1 col-span-2 whitespace-nowrap text-right">
                    Completed by
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage className="col-span-full text-right" />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="edit-profile-form">
            {isUpdatingSheet ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </div>
            ) : (
              "Upload to Google Sheet"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
