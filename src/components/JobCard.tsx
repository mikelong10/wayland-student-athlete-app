import { authOptions } from "@lib/auth";
import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@lib/utils";
import { Badge } from "@components/ui/badge";
import { Job } from "@prisma/client";
import Dot, { Status } from "@components/ui/dot";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card key={job.id} className="flex flex-col gap-4">
      <CardHeader className="flex flex-col gap-2">
        <Badge variant={Status[job.status]} className="w-fit gap-2">
          <Dot status={Status[job.status]} />
          <p className="font-normal">{Status[job.status]}</p>
        </Badge>
        <CardTitle>{`${job.adultFirstName} ${job.adultLastName}`}</CardTitle>
        <CardDescription className="text-xs pl-2 border-l-2">
          {job.contact}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{job.description}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          @ {formatDate(job.createdAt)}
        </p>
      </CardFooter>
    </Card>
  );
}
