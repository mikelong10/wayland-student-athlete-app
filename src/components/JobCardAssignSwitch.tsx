"use client";

import { User } from "@prisma/client";

import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { UserAvatar } from "./UserAvatar";

interface JobCardAssignSwitchProps {
  assignee: User | null;
  currentUser?: User;
}

export default function JobCardAssignSwitch({
  assignee,
  currentUser,
}: JobCardAssignSwitchProps) {
  if (assignee)
    return (
      <p className="flex items-center gap-2 text-sm">
        {assignee?.name}
        <UserAvatar
          user={{
            image: assignee.image,
            name: assignee.name,
          }}
          className="h-8 w-8"
        />
      </p>
    );
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="airplane-mode" className="text-sm font-normal">
        Assign to me
      </Label>
      <Switch
        id="airplane-mode"
        onCheckedChange={() => console.log(currentUser)}
      />
    </div>
  );
}
