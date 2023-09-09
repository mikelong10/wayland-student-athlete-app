import Link from "next/link";
import { ArrowDown, MoveRight } from "lucide-react";

import Container from "@components/Container";
import ServiceCard, { servicesCards } from "@components/ServiceCard";
import { Button } from "@components/ui/button";
import InteractiveButton from "@components/ui/InteractiveButton";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center pb-20">
      <Container
        id="landing-home"
        className="from-secondary to-background flex w-full flex-col justify-center gap-6 bg-gradient-to-tl to-50% py-56 dark:from-amber-950 md:items-center"
      >
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
            variant={"outline"}
            className="flex w-36 items-center justify-between"
            idScrollToElement="landing-what-we-do"
          >
            Learn more
            <ArrowDown className="-mb-1 h-5 w-5 animate-bounce" />
          </InteractiveButton>
          <Link href="/request">
            <Button className="flex w-40 items-center justify-between">
              Request a job
              <MoveRight />
            </Button>
          </Link>
        </div>
      </Container>
      <Container className="from-secondary to-background relative flex w-full flex-col items-center justify-start gap-8 bg-gradient-to-bl to-50% pb-16 dark:from-amber-950">
        <div id="landing-what-we-do" className="absolute -top-28 bg-red-500" />
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {servicesCards.map((info) => (
            <ServiceCard key={info.title} info={info} />
          ))}
        </div>
      </Container>
      <Container className="from-secondary to-background flex h-96 w-full flex-col items-center justify-center gap-6 bg-gradient-to-tr to-50% dark:from-amber-950">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl xl:text-5xl">
          Our people
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
      </Container>
      <Container className="from-secondary to-background flex w-full flex-col items-center justify-center gap-6 bg-gradient-to-br to-50% dark:from-amber-950">
        <div className="my-16 flex w-full justify-center gap-36">
          <div className="flex flex-col items-center gap-4">
            <p className="text-6xl font-bold">800+</p>
            <p className="text-md text-muted-foreground">
              Jobs requested and completed
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <p className="text-6xl font-bold">200+</p>
            <p className="text-md text-muted-foreground">
              Parents, kids, and families served
            </p>
          </div>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl xl:text-5xl">
          What people have said
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
      </Container>
    </main>
  );
}
