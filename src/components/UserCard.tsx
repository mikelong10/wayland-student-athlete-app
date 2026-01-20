"use client";

import { UserAvatar } from "@components/UserAvatar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import type { User } from "@db/types";
import { Role } from "@lib/enums";
import { formatDate } from "@lib/utils";
import UserRoleSelect from "./UserRoleSelect";

export const UserRoleText: Record<Role, string> = {
  [Role.ADMIN]: "Admin",
  [Role.STUDENT_ATHLETE]: "Student-Athlete",
  [Role.CLIENT]: "Client",
};

export default function UserCard({ user }: { user: User }) {
  return (
    <Card key={user.id} className="flex flex-col justify-between gap-4">
      <CardHeader className="flex flex-col items-start gap-3 overflow-hidden">
        <UserRoleSelect user={user} />
        <CardTitle className="flex w-full items-center gap-2">
          <UserAvatar
            user={{
              image: user.image,
              name: user.name,
            }}
            className="size-8"
          />
          <div className="flex h-full items-center overflow-auto whitespace-nowrap">
            {user.name}
          </div>
        </CardTitle>
        <CardDescription className="border-border border-l-2 pl-2 text-sm">
          {user.email}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <p className="text-muted-foreground text-xs">
          Joined: {formatDate(user.createdAt)}
        </p>
      </CardFooter>
    </Card>
  );
}
