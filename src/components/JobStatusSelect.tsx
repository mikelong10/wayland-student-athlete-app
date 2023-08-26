"use client";

import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Job, Status } from "@prisma/client";
import * as SelectPrimitive from "@radix-ui/react-select";

import { useToast } from "@components/ui/use-toast";
import { JobStatusText } from "./PersonalJobCard";
import { Badge } from "./ui/badge";
import Dot from "./ui/dot";

export default function JobStatusSelect({ job }: { job: Job }) {
  const router = useRouter();
  const { toast } = useToast();

  async function onSelectChangeConfirm(newStatus: Status) {
    if (newStatus && Object.values(Status).includes(newStatus)) {
      try {
        toast({
          title: "Updating job status...",
          description: `Moving ${job.adultFirstName}'s job from ${
            JobStatusText[job.status]
          } to ${JobStatusText[newStatus]}.`,
        });

        const response = await fetch(`/api/jobs/${job.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        });

        if (!response?.ok) {
          throw new Error();
        }

        toast({
          title: "Successful job status update!",
          description: `${job.adultFirstName}'s job was moved from ${
            JobStatusText[job.status]
          } to ${JobStatusText[newStatus]}.`,
        });

        router.refresh();
      } catch {
        toast({
          title: "Uh oh! Something went wrong.",
          description:
            "There was a problem with your request. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        description: "Invalid job role update. Please try again.",
      });
    }
  }

  return (
    <>
      <Select value={job.status} onValueChange={onSelectChangeConfirm}>
        <SelectPrimitive.Trigger>
          <Badge variant={Status[job.status]} className="w-fit gap-2">
            <Dot status={Status[job.status]} />
            <p className="whitespace-nowrap font-normal">
              {JobStatusText[job.status]}
            </p>
          </Badge>
        </SelectPrimitive.Trigger>
        <SelectContent className="w-32">
          <SelectItem value={Status.TODO}>
            {JobStatusText[Status.TODO]}
          </SelectItem>
          <SelectItem value={Status.INPROGRESS}>
            {JobStatusText[Status.INPROGRESS]}
          </SelectItem>
          <SelectItem value={Status.DONE}>
            {JobStatusText[Status.DONE]}
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
