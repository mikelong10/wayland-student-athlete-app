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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
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
      title: `Assigning ${job.adultFirstName} ${job.adultLastName}'s job to ${newAssignee.name}...`,
    });
    try {
      const response = await fetch(`/api/jobs/${job.id}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: newAssignee.id,
        }),
      });

      if (!response?.ok) {
        throw new Error();
      }

      setSelectedUsers([...selectedUsers, newAssignee]);
      toast({
        title: `Successfully assigned ${job.adultFirstName} ${job.adultLastName}'s job to ${newAssignee?.name}!`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }

  async function unassignJob(unassignee: User) {
    toast({
      title: `Unassigning ${unassignee.name} from ${job.adultFirstName} ${job.adultLastName}'s job...`,
    });
    try {
      const response = await fetch(`/api/jobs/${job.id}/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: unassignee.id,
        }),
      });

      if (!response?.ok) {
        throw new Error();
      }

      setSelectedUsers(
        [...selectedUsers].filter((user) => user.id !== unassignee.id)
      );
      toast({
        title: `Successfully unassigned ${unassignee?.name} from ${job.adultFirstName} ${job.adultLastName}'s job!`,
        variant: "success",
      });
    } catch (error) {
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <PopoverTrigger asChild>
              <div className="group flex items-center rounded-full hover:cursor-pointer">
                {selectedUsers
                  .map((user, idx) => (
                    <UserAvatar
                      key={user.id}
                      user={{
                        image: user.image,
                        name: user.name,
                      }}
                      className={`border-background bg-accent h-10 w-10 border-2 ${
                        idx !== 0 ? "-ml-3" : ""
                      }`}
                      style={{ zIndex: selectedUsers.length - idx }}
                    />
                  ))
                  .concat(
                    <div
                      key="add-user"
                      className={`border-background group-hover:bg-muted flex  items-center justify-center rounded-full border-2 transition-colors ${
                        selectedUsers.length > 0 ? "-ml-3" : ""
                      }`}
                    >
                      <UserPlus className="border-border h-9 w-9 rounded-full border p-1" />
                    </div>
                  )}
              </div>
            </PopoverTrigger>
          </TooltipTrigger>
          {!!selectedUsers.length && (
            <TooltipContent className="flex flex-col gap-2 p-4">
              <p className="font-semibold tracking-tight">Assigned to...</p>
              <ul className="ml-4 flex list-decimal flex-col gap-1 text-xs">
                {selectedUsers.map((user) => (
                  <li key={user.id}>{user.name}</li>
                ))}
              </ul>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
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
