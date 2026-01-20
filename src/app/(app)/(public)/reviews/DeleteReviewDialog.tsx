"use client";

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
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteReviewDialog({
  reviewId,
  reviewerName,
}: {
  reviewId: string;
  reviewerName: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  async function onDeleteReviewConfirm() {
    try {
      toast({
        title: `Deleting ${reviewerName}'s review...`,
        description: "So long!",
      });

      const deleteReviewResponse = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!deleteReviewResponse.ok) {
        throw new Error();
      }

      toast({
        title: `Successfully deleted ${reviewerName}'s review.`,
        description: `Click "Add Review" to add it back.`,
        variant: "success",
      });

      router.push("/reviews");
      router.refresh();
    } catch (_error) {
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
        <Trash2 className="text-destructive size-5" />
        Delete
      </Button>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {`This will delete ${reviewerName}'s review. You will have to add it back again manually if you change your mind.`}
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
