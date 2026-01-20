"use client";

import Container from "@components/Container";
import { WSALogo } from "@components/icons";
import type { buttonVariants } from "@components/ui/button";
import type { User } from "@db/types";
import { cn } from "@lib/utils";
import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
      desktopStyle: `underline-offset-4 ${
        pathname === "/what"
          ? "underline decoration-primary text-accent-foreground"
          : ""
      }`,
    },
    {
      url: "/who",
      text: "Who We Are",
      mobileVariantProps: { variant: "link" },
      mobileStyle: "text-2xl font-bold tracking-tight",
      desktopVariantProps: { variant: "link" },
      desktopStyle: `underline-offset-4 ${
        pathname === "/who"
          ? "underline decoration-primary text-accent-foreground"
          : ""
      }`,
    },
    {
      url: "/reviews",
      text: "Reviews",
      mobileVariantProps: { variant: "link" },
      mobileStyle: "text-2xl font-bold tracking-tight",
      desktopVariantProps: { variant: "link" },
      desktopStyle: `underline-offset-4 ${
        pathname === "/reviews"
          ? "underline decoration-primary text-accent-foreground"
          : ""
      }`,
    },
  ];

  const checkScroll = useCallback(() => {
    setScrolled(window.scrollY > 1);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [checkScroll]);

  return (
    <Container
      className={cn(
        "bg-background fixed left-0 top-0 z-50 w-full py-4 transition-all",
        scrolled && "dark:shadow-tertiary py-2 shadow-lg"
      )}
    >
      <header className="flex items-center justify-between gap-4 lg:gap-8">
        <Link href={"/"} className="flex h-full hover:animate-pulse">
          <WSALogo className="size-12" />
          {/* <Image src={logo} alt={"WSA logo"} width={64} height={64} /> */}
        </Link>
        <MobileNav user={user} links={headerNavLinks} />
        <DesktopNav user={user} links={headerNavLinks} />
      </header>
    </Container>
  );
}
