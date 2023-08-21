import { Button } from "@components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { Separator } from "@components/ui/separator";
import { Menu } from "lucide-react";
import Link from "next/link";
import UserAccountNav from "./UserAccountNav";
import { getCurrentUser } from "@lib/session";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="fixed top-0 flex h-20 w-full items-center justify-between gap-4 px-6 py-4 md:px-10 lg:gap-8 lg:px-16 xl:px-24">
      <Link
        href={"/"}
        className="scroll-m-20 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl transition-all hover:text-foreground-light"
      >
        WSA
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"} size={"icon"} className="md:hidden">
            <Menu size={32} />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col items-center py-16">
          <div className="flex flex-col items-center gap-6">
            <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
              Wayland Student-Athlete
            </h2>
            <UserAccountNav user={user} />
          </div>
          <Separator className="my-4" />
          <nav className="flex h-full flex-col items-center justify-center">
            <ul className="flex h-full flex-col items-center justify-center gap-16">
              <Link href={"/what"}>
                <Button variant={"link"} className="text-3xl">
                  What we do
                </Button>
              </Link>
              <Link href={"/who"}>
                <Button variant={"link"} className="text-3xl">
                  Who we are
                </Button>
              </Link>
              <Link href={"/reviews"}>
                <Button variant={"link"} className="text-3xl">
                  Reviews
                </Button>
              </Link>
              <Link href="/request">
                <Button
                  variant={"secondary"}
                  className="rounded-full p-6 text-xl"
                >
                  Request a job
                </Button>
              </Link>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="hidden h-full w-full items-center justify-between gap-3 md:flex">
        <nav className="hidden items-end md:flex md:h-full">
          <ul className="flex h-full items-end lg:gap-4">
            <li>
              <Button variant={"link"} className="text-md">
                <Link href={"/what"}>What we do</Link>
              </Button>
            </li>
            <li>
              <Button variant={"link"} className="text-md">
                <Link href={"/who"}>Who we are</Link>
              </Button>
            </li>
            <li>
              <Button variant={"link"} className="text-md">
                <Link href={"/reviews"}>Reviews</Link>
              </Button>
            </li>
          </ul>
        </nav>
        <UserAccountNav user={user} />
      </div>
    </header>
  );
}
