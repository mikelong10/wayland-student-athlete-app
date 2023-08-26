"use client";

import { Button } from "@components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@components/ui/navigation-menu";
import { NavProps } from "./Header";
import UserAccountNav from "./UserAccountNav";

export default function DesktopNav({ user, headerNavLinks }: NavProps) {
  return (
    <div className="hidden h-full w-full items-center justify-between gap-3 lg:flex">
      <NavigationMenu>
        <NavigationMenuList>
          {headerNavLinks.map((link) => (
            <NavigationMenuItem key={link.url}>
              <NavigationMenuLink href={link.url}>
                <Button
                  variant={link.desktopVariantProps.variant}
                  size={link.desktopVariantProps.size}
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
