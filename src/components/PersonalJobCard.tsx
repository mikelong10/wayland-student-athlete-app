import { Job, Status } from "@prisma/client";

import { Badge } from "@components/ui/badge";
import Dot from "@components/ui/dot";
import BaseJobCard from "./BaseJobCard";

export interface JobCardProps {
  job: Job;
}

export const JobStatusText: Record<Status, string> = {
  TODO: "To-do",
  INPROGRESS: "In progress",
  DONE: "Done",
};

export default function PersonalJobCard({ job }: JobCardProps) {
  const statusBadge = (
    <Badge variant={Status[job.status]} className="w-fit select-none gap-2">
      <Dot status={Status[job.status]} />
      <p className="font-normal">{JobStatusText[job.status]}</p>
    </Badge>
  );
  return <BaseJobCard job={job} statusAssign={statusBadge} />;
}
