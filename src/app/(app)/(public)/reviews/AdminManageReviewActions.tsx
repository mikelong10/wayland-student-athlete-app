import Link from "next/link";
import React from "react";
import { Pencil } from "lucide-react";

import { AdminActions } from "@components/AdminActions";
import { Button } from "@components/ui/button";
import DeleteReviewDialog from "./DeleteReviewDialog";

export default function AdminManageReviewActions({
  reviewId,
  reviewerName,
}: {
  reviewId: string;
  reviewerName: string;
}) {
  return (
    <AdminActions title="Manage review" className="bg-accent mt-10 w-[256px]">
      <div className="flex w-full items-center justify-center gap-4">
        <Button asChild variant={"traced"}>
          <Link href={`/reviews/${reviewId}/edit`} className="flex gap-3">
            <Pencil className="text-secondary h-5 w-5" />
            Edit
          </Link>
        </Button>
        <DeleteReviewDialog reviewId={reviewId} reviewerName={reviewerName} />
      </div>
    </AdminActions>
  );
}
