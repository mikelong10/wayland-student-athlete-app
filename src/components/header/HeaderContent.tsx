"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";

import { HeaderNavLink } from "@lib/types";
import { cn } from "@lib/utils";
import logo from "../../../public/logo.png";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const headerNavLinks: HeaderNavLink[] = [
  {
    url: "/what",
    text: "What we do",
    variant: "ghost",
    mobileStyle:
      "text-4xl tracking-tight bg-transparent hover:bg-transparent underline-offset-8 hover:underline",
    desktopStyle:
      "h-10 w-fit items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50",
  },
  {
    url: "/who",
    text: "Who we are",
    variant: "ghost",
    mobileStyle:
      "text-4xl tracking-tight bg-transparent hover:bg-transparent underline-offset-8 hover:underline",
    desktopStyle:
      "h-10 w-fit items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50",
  },
  {
    url: "/reviews",
    text: "Reviews",
    variant: "ghost",
    mobileStyle:
      "text-4xl tracking-tight bg-transparent hover:bg-transparent underline-offset-8 hover:underline",
    desktopStyle:
      "h-10 w-fit items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50",
  },
  {
    url: "/request",
    text: "Request a job",
    variant: "ghost",
    mobileStyle:
      "text-2xl tracking-tight text-primary-foreground bg-primary hover:bg-primary/80 p-8 rounded-full",
    desktopStyle:
      "h-10 w-fit items-center justify-center rounded-md px-4 py-2 text-sm font-medium underline underline-offset-8 hover:no-underline transition-all hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/50 data-[state=open]:bg-primary/50",
  },
];

export default function HeaderContent({ user }: { user?: User }) {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 top-0 flex w-full items-center justify-between gap-4 bg-transparent px-6 py-4 transition-all duration-500 md:px-10 lg:gap-8 lg:px-16 xl:px-24",
        scrolled && "bg-background-less shadow-accent py-2 shadow-lg"
      )}
    >
      <Link href={"/"} className="hover:animate-pulse">
        <Image src={logo} alt={"WSA logo"} width={40} height={40} />
      </Link>
      <MobileNav user={user} headerNavLinks={headerNavLinks} />
      <DesktopNav user={user} headerNavLinks={headerNavLinks} />
    </header>
  );
}
