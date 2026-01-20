"use client";

import { Badge } from "@components/ui/badge";
import Dot from "@components/ui/dot";
import { Select, SelectContent, SelectItem } from "@components/ui/select";
import { useToast } from "@components/ui/use-toast";
import type { Job } from "@db/types";
import { Status } from "@lib/enums";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { JobStatusText } from "./PersonalJobCard";

export default function JobStatusSelect({ job }: { job: Job }) {
  const router = useRouter();
  const { toast } = useToast();

  async function onSelectChange(newStatus: Status) {
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

        if (!response.ok) {
          throw new Error();
        }

        toast({
          title: "Successful job status update!",
          description: `${job.adultFirstName}'s job was moved from ${
            JobStatusText[job.status]
          } to ${JobStatusText[newStatus]}.`,
          variant: "success",
        });

        router.refresh();
      } catch (_error) {
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
        variant: "destructive",
      });
    }
  }

  return (
    <Select value={job.status} onValueChange={onSelectChange}>
      <SelectPrimitive.Trigger>
        <Badge
          variant={job.status as Status}
          className="hover:bg-accent dark:hover:bg-background-less w-fit gap-2"
        >
          <Dot status={job.status as Status} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="size-4 opacity-50" />
          </SelectPrimitive.Icon>
        </Badge>
      </SelectPrimitive.Trigger>
      <SelectContent align="end">
        {Object.values(Status).map((status) => (
          <SelectItem key={status} value={status}>
            {JobStatusText[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
