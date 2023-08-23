"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { NavProps } from "./Header";
import UserAccountNav from "./UserAccountNav";

export default function MobileNav({ user, headerNavLinks }: NavProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <Sheet open={navOpen} onOpenChange={setNavOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="lg:hidden">
          <Menu size={32} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col items-center py-16">
        <div className="flex flex-col items-center gap-6">
          <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
            Wayland Student-Athlete
          </h2>
          <UserAccountNav
            user={user}
            closeMobileNav={() => setNavOpen(false)}
          />
        </div>
        <Separator className="my-4" />
        <nav className="flex h-full flex-col items-center justify-center">
          <ul className="flex h-full flex-col items-center justify-center gap-16">
            {headerNavLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                onClick={() => setNavOpen(false)}
              >
                <Button variant={link.variant} className={link.mobileStyle}>
                  {link.text}
                </Button>
              </Link>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
