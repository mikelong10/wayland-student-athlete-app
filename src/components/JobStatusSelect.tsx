"use client";

import { useRouter } from "next/navigation";
import { Job, Status } from "@prisma/client";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

import { Badge } from "@components/ui/badge";
import Dot from "@components/ui/dot";
import { Select, SelectContent, SelectItem } from "@components/ui/select";
import { useToast } from "@components/ui/use-toast";
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
      <Select value={job.status} onValueChange={onSelectChange}>
        <SelectPrimitive.Trigger>
          <Badge
            variant={Status[job.status]}
            className="hover:bg-background-less dark:hover:bg-background-less w-fit gap-2"
          >
            <Dot status={Status[job.status]} />
            <SelectPrimitive.Icon asChild>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectPrimitive.Icon>
          </Badge>
        </SelectPrimitive.Trigger>
        <SelectContent className="w-32" align="end">
          {Object.values(Status).map((status) => (
            <SelectItem key={status} value={status}>
              {JobStatusText[status]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
