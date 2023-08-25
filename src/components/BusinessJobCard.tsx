import { Status, User } from "@prisma/client";

import { formatDate } from "@lib/utils";
import { JobCardProps, JobStatusText } from "@components/PersonalJobCard";
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
import JobCardAssignSwitch from "./JobCardAssignSwitch";
import { Separator } from "./ui/separator";

interface BusinessJobCardProps extends JobCardProps {
  assignee: User | null;
  currentUser?: User;
}

export default function BusinessJobCard({
  job,
  assignee,
  currentUser,
}: BusinessJobCardProps) {
  return (
    <Card key={job.id} className="flex flex-col gap-2 pt-4">
      <CardHeader className="flex flex-col gap-1">
        <div className="flex h-8 items-center justify-between gap-4">
          <Badge variant={Status[job.status]} className="w-fit gap-2">
            <Dot status={Status[job.status]} />
            <p className="font-normal">{JobStatusText[job.status]}</p>
          </Badge>
          <JobCardAssignSwitch assignee={assignee} currentUser={currentUser} />
        </div>
        <Separator />
        <CardTitle className="text-xl">{`${job.adultFirstName} ${job.adultLastName}`}</CardTitle>
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
