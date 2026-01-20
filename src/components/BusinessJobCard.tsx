"use client";

import DeleteJobDialog from "@app/(app)/(personal)/dashboard/DeleteJobDialog";
import type { JobCardProps } from "@components/PersonalJobCard";
import type { User } from "@db/types";
import { Status } from "@lib/enums";
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
        <div className="flex items-center gap-2">
          {job.status === Status.DONE && (
            <JobCompleteForm job={job} currentAssignees={currentAssignees} />
          )}
          <DeleteJobDialog job={job} />
        </div>
      }
    />
  );
}
