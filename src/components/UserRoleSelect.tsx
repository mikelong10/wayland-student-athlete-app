"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role, User } from "@prisma/client";

import { useToast } from "@components/ui/use-toast";
import { UserRoleText } from "@components/UserCard";

export default function UserRoleSelect({
  user,
  setIsSavingUserRoleUpdate,
}: {
  user: User;
  setIsSavingUserRoleUpdate: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [userRoleChangeTo, setUserRoleChangeTo] = useState<Role>();

  async function onSelectChangeConfirm() {
    setIsSavingUserRoleUpdate(true);

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: userRoleChangeTo,
      }),
    });

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: `${user.name}'s user role was not updated. Please try again.`,
        variant: "destructive",
      });
    }

    toast({
      title: "Successful user update",
      description: `${user.name}'s user role was updated from ${
        UserRoleText[user.role]
      } to ${UserRoleText[userRoleChangeTo as Role]}.`,
    });

    router.refresh();
    setIsSavingUserRoleUpdate(false);
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
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Role.CITIZEN}>
            {UserRoleText[Role.CITIZEN]}
          </SelectItem>
          <SelectItem value={Role.STUDENTATHLETE}>
            {UserRoleText[Role.STUDENTATHLETE]}
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
