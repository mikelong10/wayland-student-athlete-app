"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@prisma/client";
import Fuse from "fuse.js";

import { BusinessJobCardProps } from "@components/BusinessJobCard";
import { useToast } from "@components/ui/use-toast";
import { UserAvatar } from "@components/UserAvatar";

export default function JobCardAssign({
  job,
  currentAssignee,
  currentUser,
  allStudentAthletes,
}: BusinessJobCardProps) {
  const router = useRouter();
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
    if (assigneeId !== currentAssignee?.id) {
      console.log("assigneeId:", assigneeId);
      const newAssignee =
        allStudentAthletes.find(
          (studentAthlete) => studentAthlete.id === assigneeId
        ) || null;
      setSelectedUser(newAssignee);
      setOpen(false);
      console.log(job, currentAssignee, currentUser, assigneeId, newAssignee);
      if (currentUser) {
        toast({
          description: `Assigning job for ${job.adultFirstName} ${job.adultLastName} to ${newAssignee?.name}...`,
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

          toast({
            description: `Successfully assigned job for ${job.adultFirstName} ${job.adultLastName} to ${newAssignee?.name}!`,
          });
          router.refresh();
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
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="underline"
            size="sm"
            className="hover:text-primary focus:text-primary ml-2 w-fit justify-start px-2 py-1 hover:bg-transparent hover:underline focus:bg-transparent"
          >
            <p className="text-xs font-normal">
              {selectedUser ? selectedUser.name : "Assign job"}
            </p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="end">
          <Command filter={searchStudentAthletes}>
            <CommandInput placeholder="Assign job..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {allStudentAthletes.map((studentAthlete) => (
                  <CommandItem
                    key={studentAthlete.id}
                    value={studentAthlete.id}
                    onSelect={onAssign}
                  >
                    <span>{studentAthlete.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <UserAvatar
        user={{
          image: currentAssignee?.image,
          name: currentAssignee?.name,
        }}
        className="h-8 w-8"
      />
    </div>
  );
}
