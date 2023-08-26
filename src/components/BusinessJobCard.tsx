"use client";

import { User } from "@prisma/client";

import { formatDate } from "@lib/utils";
import { JobCardProps } from "@components/PersonalJobCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import JobCardAssign from "./JobCardAssign";
import JobStatusSelect from "./JobStatusSelect";
import { Separator } from "./ui/separator";

export interface BusinessJobCardProps extends JobCardProps {
  currentAssignee: User | null;
  currentUser?: User;
  allStudentAthletes: User[];
}

export default function BusinessJobCard({
  job,
  currentAssignee,
  currentUser,
  allStudentAthletes,
}: BusinessJobCardProps) {
  return (
    <Card key={job.id} className="flex flex-col gap-2">
      <CardHeader className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <JobStatusSelect job={job} />
          <JobCardAssign
            job={job}
            currentAssignee={currentAssignee}
            currentUser={currentUser}
            allStudentAthletes={allStudentAthletes}
          />
        </div>
        <CardTitle className="text-xl">{`${job.adultFirstName} ${job.adultLastName}`}</CardTitle>
        <CardDescription className="border-l-2 pl-2 text-xs">
          {job.contact}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
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
