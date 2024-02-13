"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Job } from "@prisma/client";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";
import { Button } from "@components/ui/button";
import { useToast } from "@components/ui/use-toast";

export default function DeleteJobDialog({ job }: { job: Job }) {
  const router = useRouter();
  const { toast } = useToast();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  async function onDeleteReviewConfirm() {
    try {
      toast({
        title: `Deleting job requested by ${job.adultFirstName}...`,
        description: "So long!",
      });

      const deleteReviewResponse = await fetch(`/api/jobs/${job.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!deleteReviewResponse.ok) {
        throw new Error();
      }

      toast({
        title: `Successfully deleted job!`,
        description: `Deleted job requested by ${job.adultFirstName}.`,
        variant: "success",
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <Button
        variant={"traced"}
        size={"icon"}
        className="size-10"
        onClick={() => setDeleteDialogOpen(true)}
      >
        <Trash2 className="size-5" />
      </Button>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {`This will delete this job from the database. You can still look at the job request email and the spreadsheet to find the info.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={onDeleteReviewConfirm}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
