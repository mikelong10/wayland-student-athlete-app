"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import UserAccountNav from "./UserAccountNav";
import { NavProps } from "./Header";
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
    </div>
  );
}
