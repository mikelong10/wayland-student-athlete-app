"use client";

import Link from "next/link";
import { HTMLAttributes } from "react";
import { CheckSquare, LogOut, User as UserIcon } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";

import { LightDarkModeToggle } from "@components/LightDarkModeToggle";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Separator } from "@components/ui/separator";
import { UserAvatar } from "@components/UserAvatar";

interface UserAccountNavProps extends HTMLAttributes<HTMLDivElement> {
  user?: Pick<User, "name" | "image" | "email">;
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
                user={{ name: user?.name || null, image: user?.image || null }}
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
              <DropdownMenuItem asChild>
                <Link href="/profile" onClick={() => closeMobileNav()}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/jobs" onClick={() => closeMobileNav()}>
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Jobs
                </Link>
              </DropdownMenuItem>
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
