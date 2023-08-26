"use client";

import Link from "next/link";
import { HTMLAttributes } from "react";
import { Role, User } from "@prisma/client";
import {
  CheckSquare,
  KanbanSquare,
  LogOut,
  UserCircle2,
  Users,
} from "lucide-react";
import { signOut } from "next-auth/react";

import { LightDarkModeToggle } from "@components/LightDarkModeToggle";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Separator } from "@components/ui/separator";
import { UserAvatar } from "@components/UserAvatar";

interface UserAccountNavProps extends HTMLAttributes<HTMLDivElement> {
  user?: User;
  closeMobileNav: () => void;
}

export default function UserAccountNav({
  user,
  closeMobileNav,
}: UserAccountNavProps) {
  return (
    <div className="flex items-center gap-3">
      <LightDarkModeToggle />
      <Separator orientation="vertical" className="h-6" />
      <div className="flex gap-2">
        {!user ? (
          <div className="flex gap-2">
            <Link href={"/login"} onClick={() => closeMobileNav()}>
              <Button>Sign in</Button>
            </Link>
            <Link href={"/register"} onClick={() => closeMobileNav()}>
              <Button variant={"outline"}>Sign up</Button>
            </Link>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
              <UserAvatar
                user={{ name: user.name, image: user.image }}
                className="h-10 w-10"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col gap-1 leading-5">
                  {user?.name && <p className="font-medium">{user.name}</p>}
                  {user?.email && (
                    <p className="text-muted-foreground w-[200px] truncate text-sm">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Personal</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/profile" onClick={() => closeMobileNav()}>
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/jobs" onClick={() => closeMobileNav()}>
                  <CheckSquare className="mr-2 h-4 w-4" />
                  My jobs
                </Link>
              </DropdownMenuItem>
              {(user.role === Role.ADMIN ||
                user.role === Role.STUDENTATHLETE) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Business</DropdownMenuLabel>
                  {user.role === Role.ADMIN && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" onClick={() => closeMobileNav()}>
                        <Users className="mr-2 h-4 w-4" />
                        Users
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" onClick={() => closeMobileNav()}>
                      <KanbanSquare className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(event) => {
                  event.preventDefault();
                  signOut({
                    callbackUrl: `/`,
                  });
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
