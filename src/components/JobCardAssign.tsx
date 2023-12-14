"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import Fuse from "fuse.js";
import { Check } from "lucide-react";

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
  currentAssignee,
  currentUser,
  allStudentAthletes,
}: BusinessJobCardProps) {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(
    currentAssignee
  );

  const fuse = new Fuse(allStudentAthletes, {
    keys: ["name"],
  });

  function searchStudentAthletes(value: string, search: string) {
    const result = fuse.search(search);
    const match = result.find((user) => user.item.id === value);
    return match ? 1 : 0;
  }

  async function onAssign(assigneeId: string) {
    if (assigneeId !== selectedUser?.id) {
      const newAssignee =
        allStudentAthletes.find(
          (studentAthlete) => studentAthlete.id === assigneeId
        ) || null;
      setOpen(false);
      if (currentUser) {
        toast({
          description: `Assigning ${job.adultFirstName} ${job.adultLastName}'s job to ${newAssignee?.name}...`,
        });
        try {
          const response = await fetch(`/api/jobs/${job.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              assignee: {
                id: assigneeId,
                role: currentUser.role,
              },
            }),
          });

          if (!response?.ok) {
            throw new Error();
          }

          setSelectedUser(newAssignee);
          toast({
            description: `Successfully assigned ${job.adultFirstName} ${job.adultLastName}'s job to ${newAssignee?.name}!`,
          });
        } catch {
          toast({
            title: "Uh oh! Something went wrong.",
            description:
              "There was a problem with your request. Please try again.",
            variant: "destructive",
          });
        }
      }
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="border-border dark:hover:shadow-tertiary flex items-center gap-2 rounded-full border px-3 py-2 transition-all hover:cursor-pointer hover:shadow-md focus:shadow-md">
          <UserAvatar
            user={{
              image: selectedUser?.image,
              name: selectedUser?.name,
            }}
            className="h-8 w-8"
          />
          <p className="overflow-auto text-center text-xs font-normal">
            {selectedUser ? selectedUser.name : "Assign job"}
          </p>
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
                  onSelect={onAssign}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedUser?.name === studentAthlete.name
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
