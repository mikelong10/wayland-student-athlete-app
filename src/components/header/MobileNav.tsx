"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import logo from "../../../public/logo.png";
import { NavProps } from "./HeaderContent";
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
            <Image src={logo} alt={"WSA logo"} width={40} height={40} />
          </Link>
        </div>
        <Separator />
        <div className="mt-2 flex h-full flex-col items-center justify-center">
          <UserAccountNav
            user={user}
            isMobile={true}
            closeMobileNav={() => setNavOpen(false)}
          />
          <nav className="flex h-full flex-col items-center justify-center">
            <ul className="flex flex-col items-center justify-center gap-10">
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
