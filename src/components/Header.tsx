"use client"

import { LightDarkModeToggle } from "@components/LightDarkModeToggle";
import { Button } from "@components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@components/ui/separator";
import { Menu } from "lucide-react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <header className="fixed top-0 flex h-20 w-full items-center justify-between gap-4 px-6 py-4 md:px-10 lg:gap-8 lg:px-16 xl:px-24">
      <div className="scroll-m-20 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl transition-all hover:text-foreground-light">
        <Link href={"/"}>WSA</Link>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"} size={"icon"} className="md:hidden">
            <Menu size={32} />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col items-center py-16">
          <div className="flex flex-col items-center gap-6">
            <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
              Wayland Student-Athlete
            </h2>
            <div className="flex items-center gap-3">
              <LightDarkModeToggle />
              <Separator orientation="vertical" className="h-6" />
              {!isSignedIn ? (
                <div className="flex gap-2">
                  <Button
                    variant={"secondary"}
                    onClick={() => setIsSignedIn(true)}
                  >
                    Sign in
                  </Button>
                  <Button variant={"outline"}>Sign up</Button>
                </div>
              ) : (
                <SheetPrimitive.Close>
                  <Button
                    variant={"accent"}
                    onClick={() => setIsSignedIn(false)}
                  >
                    Sign out
                  </Button>
                </SheetPrimitive.Close>
              )}
            </div>
          </div>
          <Separator className="my-4" />
          <nav className="flex h-full flex-col items-center justify-center">
            <ul className="flex h-full flex-col items-center justify-center gap-16">
              <Button variant={"link"} className="text-3xl">
                <Link href={"/what"}>What we do</Link>
              </Button>
              <Button variant={"link"} className="text-3xl">
                <Link href={"/who"}>Who we are</Link>
              </Button>
              <Button variant={"link"} className="text-3xl">
                <Link href={"/reviews"}>Reviews</Link>
              </Button>
              <Button
                variant={"secondary"}
                className="rounded-full p-6 text-xl"
              >
                <Link href="/request">Request a job</Link>
              </Button>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="hidden h-full w-full items-center justify-between gap-3 md:flex">
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
        <div className="flex items-center gap-3">
          <LightDarkModeToggle />
          <Separator orientation="vertical" className="h-6" />
          {!isSignedIn ? (
            <div className="flex gap-2">
              <Button variant={"secondary"} onClick={() => setIsSignedIn(true)}>
                Sign in
              </Button>
              <Button variant={"outline"}>Sign up</Button>
            </div>
          ) : (
            <Button variant={"outline"} onClick={() => setIsSignedIn(false)}>
              Sign out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
