import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role, User } from "@prisma/client";

import { formatDate } from "@lib/utils";
import { Badge } from "@components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { UserAvatar } from "@components/UserAvatar";

interface UserCardProps {
  user: User;
}

const UserRoleText: Record<Role, string> = {
  STUDENTATHLETE: "Student-Athlete",
  CITIZEN: "Citizen",
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card key={user.id} className="flex flex-col gap-4">
      <CardHeader className="flex flex-col gap-2">
        <Badge
          variant={user.role === "STUDENTATHLETE" ? "default" : "secondary"}
          className="w-fit gap-2"
        >
          <p className="font-normal">{UserRoleText[user.role]}</p>
        </Badge>
        <CardTitle className="flex items-center gap-2">
          <UserAvatar
            user={{
              image: user.image,
              name: user.name,
            }}
            className="h-8 w-8"
          />
          {user.name}
        </CardTitle>
        <CardDescription className="border-l-2 pl-2 text-sm">
          {user.email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select defaultValue={user.role}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CITIZEN">Citizen</SelectItem>
            <SelectItem value="STUDENTATHLETE">Student-Athlete</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-xs">
          Created @ {formatDate(user.createdAt)}
        </p>
      </CardFooter>
    </Card>
  );
}
