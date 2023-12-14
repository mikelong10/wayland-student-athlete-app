"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";

import { HeaderNavLink } from "@lib/types";
import { cn } from "@lib/utils";
import Container from "@components/Container";
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

  const checkScroll = () => {
    setScrolled(window.scrollY > 1);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <Container
      className={cn(
        "bg-background fixed left-0 top-0 z-50 w-full py-4 transition-all",
        scrolled && "dark:shadow-tertiary py-2 shadow-lg"
      )}
    >
      <header className="flex items-center justify-between gap-4 lg:gap-8">
        <Link href={"/"} className="hover:animate-pulse">
          <Image src={logo} alt={"WSA logo"} width={48} height={48} />
        </Link>
        <MobileNav user={user} headerNavLinks={headerNavLinks} />
        <DesktopNav user={user} headerNavLinks={headerNavLinks} />
      </header>
    </Container>
  );
}
