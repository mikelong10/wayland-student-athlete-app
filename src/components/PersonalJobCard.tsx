import { Badge } from "@components/ui/badge";
import Dot from "@components/ui/dot";
import type { Job } from "@db/types";
import { Status } from "@lib/enums";
import BaseJobCard from "./BaseJobCard";

export interface JobCardProps {
  job: Job;
}

export const JobStatusText: Record<Status, string> = {
  [Status.TODO]: "To-do",
  [Status.IN_PROGRESS]: "In progress",
  [Status.DONE]: "Done",
};

export default function PersonalJobCard({ job }: JobCardProps) {
  const statusBadge = (
    <Badge variant={job.status as Status} className="w-fit select-none gap-2">
      <Dot status={job.status as Status} />
      <p className="text-accent-foreground font-semibold">
        {JobStatusText[job.status]}
      </p>
    </Badge>
  );
  return <BaseJobCard job={job} statusAssign={statusBadge} />;
}
