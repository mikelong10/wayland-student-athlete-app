"use client";

import DeleteJobDialog from "@app/(app)/(personal)/dashboard/DeleteJobDialog";
import { Status, User } from "@prisma/client";

import { JobCardProps } from "@components/PersonalJobCard";
import BaseJobCard from "./BaseJobCard";
import JobCardAssign from "./JobCardAssign";
import JobCompleteForm from "./JobCompleteForm";
import JobStatusSelect from "./JobStatusSelect";

export interface BusinessJobCardProps extends JobCardProps {
  currentAssignees: User[];
  allStudentAthletes: User[];
}

export default function BusinessJobCard({
  job,
  currentAssignees,
  allStudentAthletes,
}: BusinessJobCardProps) {
  const statusToggleAndJobAssign = (
    <div className="flex items-center justify-between gap-4">
      <JobCardAssign
        job={job}
        currentAssignees={currentAssignees}
        allStudentAthletes={allStudentAthletes}
      />
      <JobStatusSelect job={job} />
    </div>
  );

  return (
    <BaseJobCard
      job={job}
      statusAssign={statusToggleAndJobAssign}
      footerActions={
        <>
          {job.status === Status.DONE && (
            <JobCompleteForm job={job} currentAssignees={currentAssignees} />
          )}
          <DeleteJobDialog job={job} />
        </>
      }
    />
  );
}
