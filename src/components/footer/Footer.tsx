import Link from "next/link";
import * as React from "react";

import { cn } from "@lib/utils";
import Container from "@components/Container";
import { FacebookLogo } from "@components/icons";
import { Separator } from "@components/ui/separator";

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <Container className="bg-background border-border w-full border-t py-4 transition-all">
      <footer className={cn(className, "flex w-full flex-col items-center")}>
        <div className="flex w-full flex-col items-center justify-between gap-4 text-center text-xs leading-loose md:text-left lg:flex-row lg:text-sm">
          <div className="flex flex-col items-center gap-4 text-sm sm:flex-row sm:gap-8">
            <Link
              href={"https://www.facebook.com/waylandstudentathlete/"}
              target="_blank"
            >
              <FacebookLogo className="h-8 w-8" />
            </Link>
            <div className="flex h-auto flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <a
                className="font-medium underline-offset-4 hover:underline"
                href="mailto:waylandstudentathlete@gmail.com"
              >
                waylandstudentathlete@gmail.com
              </a>
              <Separator className="w-4 sm:hidden" />
              <Separator
                orientation="vertical"
                className="hidden h-6 sm:block"
              />
              <a
                className="hover:text-muted-foreground font-medium transition-colors"
                href="tel:+1781-266-8116"
              >
                (781) 266-8116
              </a>
            </div>
          </div>
          <div className="flex gap-1 text-xs">
            <p>Made with &hearts; by</p>
            <p>
              <a
                href={"https://www.linkedin.com/in/michaeltlong10/"}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground-less font-medium underline underline-offset-4"
              >
                mikelong10
              </a>
            </p>
          </div>
        </div>
      </footer>
    </Container>
  );
}
