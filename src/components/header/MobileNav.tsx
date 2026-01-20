"use client";

import { WSALogo } from "@components/icons";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { NavProps } from "./HeaderContent";
import UserAccountNav from "./UserAccountNav";

export default function MobileNav({ user, links }: NavProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <Sheet open={navOpen} onOpenChange={setNavOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="lg:hidden">
          <Menu size={32} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full min-w-[224px] flex-col items-center gap-4 py-4">
        <div className="flex w-full items-center">
          <Link
            href={"/"}
            className="hover:animate-pulse"
            onClick={() => setNavOpen(false)}
          >
            <WSALogo className="size-12" />
          </Link>
        </div>
        <Separator />
        <div className="flex h-full flex-col items-center justify-between">
          <UserAccountNav
            user={user}
            isMobile={true}
            closeMobileNav={() => setNavOpen(false)}
          />
          <nav className="flex flex-col items-center justify-center">
            <ul className="flex flex-col items-center justify-between gap-12">
              {links.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  onClick={() => setNavOpen(false)}
                >
                  <Button
                    variant={link.mobileVariantProps.variant}
                    className={link.mobileStyle}
                  >
                    {link.text}
                  </Button>
                </Link>
              ))}
            </ul>
          </nav>
          <Link href={"/request"} onClick={() => setNavOpen(false)}>
            <Button className="mb-16 h-auto rounded-full px-8 py-6 text-2xl font-bold tracking-tight">
              Request a Job
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
