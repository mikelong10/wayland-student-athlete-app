import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@components/ui/button";
import InteractiveButton from "@components/ui/InteractiveButton";
import { Separator } from "@components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { NavProps } from "./Header";
import UserAccountNav from "./UserAccountNav";

export default function MobileNav({ user, headerNavLinks }: NavProps) {
  return (
    <Sheet>
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
          <UserAccountNav user={user} />
        </div>
        <Separator className="my-4" />
        <nav className="flex h-full flex-col items-center justify-center">
          <ul className="flex h-full flex-col items-center justify-center gap-16">
            {headerNavLinks.map((link) => (
              <Link key={link.url} href={link.url}>
                <InteractiveButton
                  variant={link.variant}
                  className={link.mobileStyle}
                  sheetCloseButton
                >
                  {link.text}
                </InteractiveButton>
              </Link>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
