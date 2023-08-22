import Link from "next/link";
import { getCurrentUser } from "@lib/session";
import { ActiveUser, HeaderNavLink } from "@lib/types";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

export interface NavProps {
  user?: ActiveUser;
  headerNavLinks: HeaderNavLink[];
}

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

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="fixed top-0 left-0 flex h-20 w-full items-center justify-between gap-4 px-6 py-4 md:px-10 lg:gap-8 lg:px-16 xl:px-24">
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
