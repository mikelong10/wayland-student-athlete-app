"use client"

import Link from "next/link";
import { ActiveUser, HeaderNavLink } from "@lib/types";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { useEffect, useState } from "react";
import { cn } from "@lib/utils";

const headerNavLinks: HeaderNavLink[] = [
  {
    url: "/what",
    text: "What we do",
    variant: "ghost",
    mobileStyle: "text-4xl tracking-tight bg-transparent hover:bg-transparent underline-offset-8 hover:underline",
    desktopStyle: "h-10 w-fit items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50",
  },
  {
    url: "/who",
    text: "Who we are",
    variant: "ghost",
    mobileStyle: "text-4xl tracking-tight bg-transparent hover:bg-transparent underline-offset-8 hover:underline",
    desktopStyle: "h-10 w-fit items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50",
  },
  {
    url: "/reviews",
    text: "Reviews",
    variant: "ghost",
    mobileStyle: "text-4xl tracking-tight bg-transparent hover:bg-transparent underline-offset-8 hover:underline",
    desktopStyle: "h-10 w-fit items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50",
  },
  {
    url: "/request",
    text: "Request a job",
    variant: "ghost",
    mobileStyle: "text-2xl tracking-tight text-primary-foreground bg-primary hover:bg-primary/80 p-8 rounded-full",
    desktopStyle: "h-10 w-fit items-center justify-center rounded-md px-4 py-2 text-sm font-medium underline underline-offset-8 hover:no-underline transition-all hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/50 data-[state=open]:bg-primary/50",
  },
];

export default function HeaderContent({ user }: { user?: ActiveUser }) {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header className={cn("fixed top-0 left-0 flex w-full items-center justify-between gap-4 px-6 py-4 md:px-10 lg:gap-8 lg:px-16 xl:px-24 bg-transparent transition-all duration-500", scrolled && 'bg-background shadow-background-less shadow-lg py-3')}>
      <Link
        href={"/"}
        className="scroll-m-20 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl transition-all hover:text-foreground-less"
      >
        WSA
      </Link>
      <MobileNav user={user} headerNavLinks={headerNavLinks} />
      <DesktopNav user={user} headerNavLinks={headerNavLinks} />
    </header>
  );
}