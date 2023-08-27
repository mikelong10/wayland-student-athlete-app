"use client";

import { User } from "@prisma/client";

import { JobCardProps } from "@components/PersonalJobCard";
import BaseJobCard from "./BaseJobCard";
import JobCardAssign from "./JobCardAssign";
import JobStatusSelect from "./JobStatusSelect";

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
  const statusToggleAndJobAssign = (
    <div className="flex items-center justify-between">
      <JobStatusSelect job={job} />
      <JobCardAssign
        job={job}
        currentAssignee={currentAssignee}
        currentUser={currentUser}
        allStudentAthletes={allStudentAthletes}
      />
    </div>
  );
  return <BaseJobCard job={job} statusAssign={statusToggleAndJobAssign} />;
}
