"use client";

import { Button } from "@components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@components/ui/navigation-menu";
import { NavProps } from "./HeaderContent";
import UserAccountNav from "./UserAccountNav";

export default function DesktopNav({ user, links }: NavProps) {
  return (
    <div className="hidden h-full w-full items-center justify-between gap-3 lg:flex">
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((link) => (
            <NavigationMenuItem key={link.url}>
              <NavigationMenuLink href={link.url}>
                <Button
                  variant={link.desktopVariantProps.variant}
                  className={link.desktopStyle}
                >
                  {link.text}
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <UserAccountNav user={user} isMobile={false} closeMobileNav={() => {}} />
    </div>
  );
}
