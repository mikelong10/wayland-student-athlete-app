"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "@db/types";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

import { Role } from "@lib/enums";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";
import { Badge } from "@components/ui/badge";
import { Select, SelectContent, SelectItem } from "@components/ui/select";
import { useToast } from "@components/ui/use-toast";
import { UserRoleText } from "@components/UserCard";

export default function UserRoleSelect({ user }: { user: User }) {
  const router = useRouter();
  const { toast } = useToast();

  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [userRoleChangeTo, setUserRoleChangeTo] = useState<Role>();

  async function onSelectChangeConfirm() {
    if (userRoleChangeTo && Object.values(Role).includes(userRoleChangeTo)) {
      try {
        toast({
          title: "Updating user role...",
          description: `Changing ${user.name}'s role from ${
            UserRoleText[user.role]
          } to ${UserRoleText[userRoleChangeTo]}.`,
        });

        const response = await fetch(`/api/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: userRoleChangeTo,
          }),
        });

        if (!response.ok) {
          throw new Error();
        }

        toast({
          title: "Successful user update!",
          description: `${user.name}'s user role was updated from ${
            UserRoleText[user.role]
          } to ${UserRoleText[userRoleChangeTo]}.`,
          variant: "success",
        });

        router.refresh();
      } catch (error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description:
            "There was a problem with your request. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        description: "Invalid user role update. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Select
        value={user.role}
        onValueChange={(newRole: Role) => {
          setUserRoleChangeTo(newRole);
          setAlertDialogOpen(true);
        }}
      >
        <SelectPrimitive.Trigger>
          <Badge
            variant={
              user.role === Role.ADMIN
                ? "default"
                : user.role === Role.STUDENT_ATHLETE
                  ? "secondary"
                  : "accent"
            }
            className="w-fit gap-2"
          >
            <p className="font-semibold">{UserRoleText[user.role]}</p>
            <SelectPrimitive.Icon asChild>
              <ChevronDown className="size-4 opacity-50" />
            </SelectPrimitive.Icon>
          </Badge>
        </SelectPrimitive.Trigger>
        <SelectContent>
          <SelectItem value={Role.CLIENT}>
            {UserRoleText[Role.CLIENT]}
          </SelectItem>
          <SelectItem value={Role.STUDENT_ATHLETE}>
            {UserRoleText[Role.STUDENT_ATHLETE]}
          </SelectItem>
          <SelectItem value={Role.ADMIN}>{UserRoleText[Role.ADMIN]}</SelectItem>
        </SelectContent>
      </Select>
      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {`You are changing ${user.name}'s role from ${
                UserRoleText[user.role]
              } to ${UserRoleText[userRoleChangeTo as Role]}.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onSelectChangeConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
