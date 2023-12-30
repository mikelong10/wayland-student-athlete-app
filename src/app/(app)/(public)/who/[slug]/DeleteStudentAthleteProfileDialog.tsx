"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { StudentAthleteProfileWithResume } from "./edit/EditStudentAthleteProfileForm";

export default function DeleteStudentAthleteProfileDialog({
  studentAthlete,
}: {
  studentAthlete: StudentAthleteProfileWithResume;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  async function onDeleteProfileConfirm() {
    console.log("studentAthlete", studentAthlete);
    try {
      toast({
        title: `Deleting ${studentAthlete.name}'s profile...`,
        description: "See ya later, alligator!",
      });

      const deleteProfileResponse = await fetch(
        `/api/student-athletes/${studentAthlete.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!deleteProfileResponse?.ok) {
        throw new Error();
      }

      toast({
        title: `Successfully deleted ${studentAthlete.name}'s profile.`,
        description: `Click "Add Profile" to add them back.`,
        variant: "success",
      });

      router.push("/who");
      router.refresh();
    } catch {
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
        className="flex gap-3"
        onClick={() => setDeleteDialogOpen(true)}
      >
        <Trash2 className="text-destructive h-5 w-5" />
        Delete
      </Button>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {`This will delete ${studentAthlete.name}'s profile. You will have to add them back again manually if you change your mind.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={onDeleteProfileConfirm}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
