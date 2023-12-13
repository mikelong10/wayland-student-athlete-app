"use client";

import { Role, User } from "@prisma/client";

import { formatDate } from "@lib/utils";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { UserAvatar } from "@components/UserAvatar";
import UserRoleSelect from "./UserRoleSelect";

interface UserCardProps {
  user: User;
}

export const UserRoleText: Record<Role, string> = {
  ADMIN: "Admin",
  STUDENTATHLETE: "Student-Athlete",
  CITIZEN: "Citizen",
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card key={user.id} className="flex flex-col justify-between gap-4">
      <CardHeader className="flex flex-col items-start gap-3 overflow-hidden">
        <UserRoleSelect user={user} />
        <CardTitle className="flex items-center gap-2 w-full">
          <UserAvatar
            user={{
              image: user.image,
              name: user.name,
            }}
            className="h-8 w-8"
          />
          <div className="flex items-center h-full whitespace-nowrap overflow-auto">{user.name}</div>
        </CardTitle>
        <CardDescription className="border-l-2 pl-2 text-sm">
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
