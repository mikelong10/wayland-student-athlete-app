import { ReactNode } from "react";
import { Job } from "@prisma/client";

import { formatDate } from "@lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

export interface BaseJobCardProps {
  job: Job;
  statusAssign: ReactNode;
}

export default function BaseJobCard({ job, statusAssign }: BaseJobCardProps) {
  return (
    <Card key={job.id} className="flex flex-col gap-4">
      <CardHeader className="flex flex-col gap-2">
        {statusAssign}
        <div className="flex flex-col">
          <CardTitle className="flex w-full items-center">
            <div className="flex h-10 items-end overflow-auto whitespace-nowrap">
              {`${job.adultFirstName} ${job.adultLastName}`}
            </div>
          </CardTitle>
          <CardDescription>{job.contact}</CardDescription>
        </div>
      </CardHeader>
      <div className="flex h-full flex-col justify-between gap-4">
        <CardContent>
          <p className="border-l-2 pl-2">{job.description}</p>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-xs italic">
            Requested: {formatDate(job.createdAt)}
          </p>
        </CardFooter>
      </div>
    </Card>
  );
}
