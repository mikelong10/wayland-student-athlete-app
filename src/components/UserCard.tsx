"use client"

import { useState } from "react"
import { Badge } from "@components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card"
import { UserAvatar } from "@components/UserAvatar"
import { formatDate } from "@lib/utils"
import { Role, User } from "@prisma/client"

import UserRoleSelect from "./UserRoleSelect"
import { Loader2 } from "lucide-react"

interface UserCardProps {
  user: User
}

export const UserRoleText: Record<Role, string> = {
  ADMIN: "Admin",
  STUDENTATHLETE: "Student-Athlete",
  CITIZEN: "Citizen",
}

export default function UserCard({ user }: UserCardProps) {
  const [isSavingUserRoleUpdate, setIsSavingUserRoleUpdate] = useState(false)

  return (
    <Card key={user.id} className="flex flex-col gap-4">
      {isSavingUserRoleUpdate ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          <CardHeader className="flex flex-col gap-2">
            <Badge
              variant={
                user.role === "ADMIN"
                  ? "default"
                  : user.role === "STUDENTATHLETE"
                  ? "secondary"
                  : "accent"
              }
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
            <UserRoleSelect user={user} setIsSavingUserRoleUpdate={setIsSavingUserRoleUpdate} />
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-xs">
              Created @ {formatDate(user.createdAt)}
            </p>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
