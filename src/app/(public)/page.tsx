import Link from "next/link";
import { MoveRight } from "lucide-react";

import { Button } from "@components/ui/button";
import InteractiveButton from "@components/ui/InteractiveButton";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <section className="from-secondary to-background dark:to-background flex min-h-screen w-full flex-col justify-center gap-6 bg-gradient-to-bl to-70% px-6 dark:from-stone-900 md:px-10 lg:px-16 xl:px-24">
        <div className="text-foreground xs:hidden scroll-m-20 text-4xl font-extrabold tracking-tight">
          <h1>Wayland</h1>
          <h1>Student-Athlete</h1>
        </div>
        <h1 className="text-foreground max-xs:hidden scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl">
          Wayland Student-Athlete
        </h1>
        <p className="text-foreground-less scroll-m-20 text-xl font-medium tracking-tight md:text-2xl">
          Simple, trustworthy, quality{" "}
          <span className="text-primary">solutions</span> for all your{" "}
          <span className="text-primary">odd jobs</span>.
        </p>
        <div className="flex gap-4">
          <InteractiveButton
            variant={"secondary"}
            className="w-32"
            idScrollToElement="landing-what-we-do"
          >
            Learn more
          </InteractiveButton>
          <Link href="/request">
            <Button className="flex w-40 items-center gap-2">
              Request a job
              <MoveRight />
            </Button>
          </Link>
        </div>
      </section>
      <section
        id="landing-what-we-do"
        className="flex min-h-screen w-full flex-col justify-center gap-6 px-6 md:px-10 lg:px-16 xl:px-24"
      >
        <h1 className="text-foreground scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl">
          What we do
        </h1>
        <p className="text-foreground-less scroll-m-20 text-xl font-medium tracking-tight md:text-2xl">
          Simple, trustworthy, quality{" "}
          <span className="text-primary">solutions</span> for all your{" "}
          <span className="text-primary">odd jobs</span>.
        </p>
        <Link href="/request">
          <Button className="flex w-40 items-center gap-2">
            Request a job
            <MoveRight />
          </Button>
        </Link>
      </section>
      <section className="flex min-h-screen w-full flex-col justify-center gap-6 px-6 md:px-10 lg:px-16 xl:px-24">
        <h1 className="text-foreground scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl">
          Who we are
        </h1>
        <p className="text-foreground-less scroll-m-20 text-xl font-medium tracking-tight md:text-2xl">
          Simple, trustworthy, quality{" "}
          <span className="text-primary">solutions</span> for all your{" "}
          <span className="text-primary">odd jobs</span>.
        </p>
        <Link href="/request">
          <Button className="flex w-40 items-center gap-2">
            Request a job
            <MoveRight />
          </Button>
        </Link>
      </section>
      <section className="flex min-h-screen w-full flex-col justify-center gap-6 px-6 md:px-10 lg:px-16 xl:px-24">
        <h1 className="text-foreground scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl">
          Reviews
        </h1>
        <p className="text-foreground-less scroll-m-20 text-xl font-medium tracking-tight md:text-2xl">
          Simple, trustworthy, quality{" "}
          <span className="text-primary">solutions</span> for all your{" "}
          <span className="text-primary">odd jobs</span>.
        </p>
        <Link href="/request">
          <Button className="flex w-40 items-center gap-2">
            Request a job
            <MoveRight />
          </Button>
        </Link>
      </section>
    </main>
  );
}
