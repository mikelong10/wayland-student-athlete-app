"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import Fuse from "fuse.js";
import { Check, UserPlus } from "lucide-react";

import { cn } from "@lib/utils";
import { BusinessJobCardProps } from "@components/BusinessJobCard";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { useToast } from "@components/ui/use-toast";
import { UserAvatar } from "@components/UserAvatar";

export default function JobCardAssign({
  job,
  currentAssignees,
  allStudentAthletes,
}: BusinessJobCardProps) {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>(currentAssignees);

  const fuse = new Fuse(allStudentAthletes, {
    keys: ["name"],
  });

  function searchStudentAthletes(value: string, search: string) {
    const result = fuse.search(search);
    const match = result.find((user) => user.item.id === value);
    return match ? 1 : 0;
  }

  async function assignJob(newAssignee: User) {
    toast({
      description: `Assigning ${job.adultFirstName} ${job.adultLastName}'s job to ${newAssignee.name}...`,
    });
    try {
      const response = await fetch(`/api/jobs/${job.id}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assigneeId: newAssignee.id,
        }),
      });

      if (!response?.ok) {
        throw new Error();
      }

      setSelectedUsers([...selectedUsers, newAssignee]);
      toast({
        description: `Successfully assigned ${job.adultFirstName} ${job.adultLastName}'s job to ${newAssignee?.name}!`,
      });
    } catch {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }

  async function unassignJob(unassignee: User) {
    toast({
      description: `Unassigning ${unassignee.name} from ${job.adultFirstName} ${job.adultLastName}'s job...`,
    });
    try {
      const response = await fetch(`/api/jobs/${job.id}/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unassigneeId: unassignee.id,
        }),
      });

      if (!response?.ok) {
        throw new Error();
      }

      setSelectedUsers(
        [...selectedUsers].filter((user) => user.id !== unassignee.id)
      );
      toast({
        description: `Successfully unassigned ${unassignee?.name} from ${job.adultFirstName} ${job.adultLastName}'s job!`,
      });
    } catch {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }

  async function toggleAssign(userId: string) {
    setOpen(false);
    const foundUser = selectedUsers.find((user) => user.id === userId);
    // If the user is not already assigned to this job
    if (!foundUser) {
      // find them in the list of all student athletes
      const newAssignee = allStudentAthletes.find(
        (studentAthlete) => studentAthlete.id === userId
      );
      // and assign them to this job
      if (newAssignee) {
        await assignJob(newAssignee);
      }
      // If the user is already assigned to this job
    } else {
      // unassign them from this job
      await unassignJob(foundUser);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="border-border dark:hover:shadow-tertiary flex items-center rounded-full border p-2 transition-all hover:cursor-pointer hover:shadow-md focus:shadow-md">
          {selectedUsers.length ? (
            selectedUsers.map((user, idx) => (
              <UserAvatar
                key={user.id}
                user={{
                  image: user.image,
                  name: user.name,
                }}
                className={`border-background bg-accent h-8 w-8 border-2 ${
                  idx !== 0 ? "-ml-2" : ""
                }`}
                style={{ zIndex: selectedUsers.length - idx }}
              />
            ))
          ) : (
            <UserPlus className="h-8 w-8 p-1" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom" align="start">
        <Command filter={searchStudentAthletes}>
          <CommandInput placeholder="Assign job to..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {allStudentAthletes.map((studentAthlete) => (
                <CommandItem
                  key={studentAthlete.id}
                  value={studentAthlete.id}
                  onSelect={toggleAssign}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedUsers.find(
                        (user) => user.id === studentAthlete.id
                      )
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <span>{studentAthlete.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
