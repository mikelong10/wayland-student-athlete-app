"use client";

import { User } from "@prisma/client";

import { JobCardProps } from "@components/PersonalJobCard";
import BaseJobCard from "./BaseJobCard";
import JobCardAssign from "./JobCardAssign";
import JobStatusSelect from "./JobStatusSelect";

export interface BusinessJobCardProps extends JobCardProps {
  currentAssignees: User[];
  currentUser?: User;
  allStudentAthletes: User[];
}

export default function BusinessJobCard({
  job,
  currentAssignees,
  currentUser,
  allStudentAthletes,
}: BusinessJobCardProps) {
  const statusToggleAndJobAssign = (
    <div className="flex items-center justify-between gap-4">
      <JobCardAssign
        job={job}
        currentAssignees={currentAssignees}
        currentUser={currentUser}
        allStudentAthletes={allStudentAthletes}
      />
      <JobStatusSelect job={job} />
    </div>
  );
  return <BaseJobCard job={job} statusAssign={statusToggleAndJobAssign} />;
}
