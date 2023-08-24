import * as React from "react";

import { cn } from "@lib/utils";
import { Separator } from "@components/ui/separator";

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn(
        "w-full px-6 py-4 transition-all md:px-10 lg:px-16 xl:px-24",
        className
      )}
    >
      <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:gap-6">
        <div className="flex flex-col items-center gap-2 text-center text-sm leading-loose sm:flex-row sm:gap-4 md:text-left">
          <div className="flex gap-1">
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
          <Separator className="w-4 sm:hidden" />
          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          <div className="flex gap-1">
            Built with
            <div className="flex items-end">
              <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground-less font-medium underline underline-offset-4"
              >
                Next.js
              </a>
            </div>
            and hosted on
            <div className="flex items-end">
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground-less font-medium underline underline-offset-4"
              >
                Vercel
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
