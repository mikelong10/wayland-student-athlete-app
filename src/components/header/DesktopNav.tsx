"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import UserAccountNav from "./UserAccountNav";
import { NavProps } from "./Header";
import Link from "next/link";
import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";

export default function DesktopNav({ user, headerNavLinks }: NavProps) {
  return (
    <div className="hidden h-full w-full items-center justify-between gap-3 lg:flex">
      <NavigationMenu>
        <NavigationMenuList>
          {headerNavLinks.map((link) => (
            <NavigationMenuItem key={link.url}>
              <NavigationMenuLink href={link.url}>
                <Button variant={link.variant} className={link.desktopStyle}>
                  {link.text}
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <UserAccountNav user={user} />

      {/* <div className="hidden h-full w-full items-center justify-between gap-3 md:flex">
            <nav className="hidden items-end md:flex md:h-full">
              <ul className="flex h-full items-end lg:gap-4">
                <li>
                  <Button variant={"link"} className="text-md">
                    <Link href={"/what"}>What we do</Link>
                  </Button>
                </li>
                <li>
                  <Button variant={"link"} className="text-md">
                    <Link href={"/who"}>Who we are</Link>
                  </Button>
                </li>
                <li>
                  <Button variant={"link"} className="text-md">
                    <Link href={"/reviews"}>Reviews</Link>
                  </Button>
                </li>
              </ul>
            </nav>
            <UserAccountNav user={user} />
          </div> */}
    </div>
  );
}
