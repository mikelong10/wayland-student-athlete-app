"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils";
import Container from "@components/Container";
import { buttonVariants } from "@components/ui/button";
import logo from "../../../public/logo.png";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export interface NavProps {
  user?: User;
  links: HeaderNavLink[];
}

export type HeaderNavLink = {
  url: string;
  text: string;
  mobileVariantProps: VariantProps<typeof buttonVariants>;
  desktopVariantProps: VariantProps<typeof buttonVariants>;
  mobileStyle: string;
  desktopStyle: string;
};

export default function HeaderContent({ user }: { user?: User }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const headerNavLinks: HeaderNavLink[] = [
    {
      url: "/what",
      text: "What We Do",
      mobileVariantProps: { variant: "link" },
      mobileStyle: "text-2xl font-bold tracking-tight",
      desktopVariantProps: { variant: "link" },
      desktopStyle: `underline-offset-8 ${
        pathname === "/what" ? "underline" : ""
      }`,
    },
    {
      url: "/who",
      text: "Who We Are",
      mobileVariantProps: { variant: "link" },
      mobileStyle: "text-2xl font-bold tracking-tight",
      desktopVariantProps: { variant: "link" },
      desktopStyle: `underline-offset-8 ${
        pathname === "/who" ? "underline" : ""
      }`,
    },
    {
      url: "/reviews",
      text: "Reviews",
      mobileVariantProps: { variant: "link" },
      mobileStyle: "text-2xl font-bold tracking-tight",
      desktopVariantProps: { variant: "link" },
      desktopStyle: `underline-offset-8 ${
        pathname === "/reviews" ? "underline" : ""
      }`,
    },
    {
      url: "/request",
      text: "Request a Job",
      mobileVariantProps: { variant: "default" },
      mobileStyle:
        "text-2xl font-bold tracking-tight mt-16 px-8 py-6 h-auto rounded-full",
      desktopVariantProps: { variant: "default" },
      desktopStyle: `ml-4 rounded-full underline-offset-8 ${
        pathname === "/request"
          ? "underline bg-transparent ml-0 text-foreground"
          : ""
      }`,
    },
  ];

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
        <MobileNav user={user} links={headerNavLinks} />
        <DesktopNav user={user} links={headerNavLinks} />
      </header>
    </Container>
  );
}
