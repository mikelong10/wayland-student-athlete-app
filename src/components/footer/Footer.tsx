import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";

import InteractiveButton from "@components/ui/InteractiveButton";
import { Separator } from "@components/ui/separator";
import logo from "../../../public/logo.png";
import nextjs from "../../../public/next.svg";
import vercel from "../../../public/vercel.svg";

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn(
        "w-full px-6 py-2 transition-all md:px-10 lg:px-16 xl:px-24",
        className
      )}
    >
      <div className="flex w-full flex-col items-center gap-3 py-4 sm:flex-row sm:gap-6">
        <InteractiveButton
          variant={"none"}
          idScrollToElement="landing-home"
          className="p-0 hover:animate-pulse"
        >
          <Image src={logo} alt={"WSA logo"} width={40} height={40} />
        </InteractiveButton>
        <div className="flex flex-col items-center gap-2 text-center text-sm leading-loose sm:flex-row sm:gap-4 md:text-left">
          <div className="flex gap-1">
            <p>Made with &hearts; by</p>
            <p>
              <a
                href={"https://www.linkedin.com/in/michaeltlong10/"}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                mikelong10
              </a>
            </p>
          </div>
          <Separator className="sm:hidden" />
          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          <div className="flex gap-2">
            Built with
            <div className="flex items-end">
              <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noreferrer"
                className="border-foreground mb-1 border-b-2 pb-1"
              >
                <Image
                  src={nextjs}
                  alt={"Next.js logo"}
                  width={48}
                  height={32}
                />
              </a>
            </div>
            and hosted on
            <div className="flex items-end">
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="border-foreground mb-1 border-b-2 pb-1"
              >
                <Image
                  src={vercel}
                  alt={"Vercel logo"}
                  width={48}
                  height={32}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
