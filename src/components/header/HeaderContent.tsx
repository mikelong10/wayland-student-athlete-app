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
    mobileVariantProps: { variant: "link" },
    desktopVariantProps: { variant: "link" },
    mobileStyle:
      "text-2xl font-bold tracking-tight underline-offset-8 hover:underline",
    desktopStyle: "underline-offset-8 hover:underline",
  },
  {
    url: "/who",
    text: "Who we are",
    mobileVariantProps: { variant: "link" },
    desktopVariantProps: { variant: "link" },
    mobileStyle:
      "text-2xl font-bold tracking-tight underline-offset-8 hover:underline",
    desktopStyle: "underline-offset-8 hover:underline",
  },
  {
    url: "/reviews",
    text: "Reviews",
    mobileVariantProps: { variant: "link" },
    desktopVariantProps: { variant: "link" },
    mobileStyle:
      "text-2xl font-bold tracking-tight underline-offset-8 hover:underline",
    desktopStyle: "underline-offset-8 hover:underline",
  },
  {
    url: "/request",
    text: "Request a job",
    mobileVariantProps: { variant: "default" },
    desktopVariantProps: { variant: "underline" },
    mobileStyle: "text-lg px-6 py-3 h-auto rounded-lg",
    desktopStyle: "underline-offset-8",
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
        "fixed left-0 top-0 z-50 flex w-full items-center justify-between gap-4 bg-transparent px-6 py-4 transition-all md:px-10 lg:gap-8 lg:px-16 xl:px-24",
        scrolled && "bg-background shadow-accent py-2 shadow-lg"
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
