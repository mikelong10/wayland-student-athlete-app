import { Job, Status } from "@prisma/client";

import { formatDate } from "@lib/utils";
import { Badge } from "@components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import Dot from "@components/ui/dot";

export interface JobCardProps {
  job: Job;
}

export const JobStatusText: Record<Status, string> = {
  TODO: "To-do",
  INPROGRESS: "In progress",
  DONE: "Done",
};

export default function PersonalJobCard({ job }: JobCardProps) {
  return (
    <Card key={job.id} className="flex flex-col gap-4">
      <CardHeader className="flex flex-col gap-2">
        <Badge variant={Status[job.status]} className="w-fit gap-2">
          <Dot status={Status[job.status]} />
          <p className="font-normal">{JobStatusText[job.status]}</p>
        </Badge>
        <CardTitle>{`${job.adultFirstName} ${job.adultLastName}`}</CardTitle>
        <CardDescription className="border-l-2 pl-2 text-xs">
          {job.contact}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{job.description}</p>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-xs">
          Requested @ {formatDate(job.createdAt)}
        </p>
      </CardFooter>
    </Card>
  );
}
