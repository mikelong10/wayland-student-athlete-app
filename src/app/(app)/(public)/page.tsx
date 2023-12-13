import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MoveRight } from "lucide-react";

import Carousel from "@components/Carousel";
import Container from "@components/Container";
import ServiceCard, { servicesCards } from "@components/ServiceCard";
import { Button } from "@components/ui/button";
import InteractiveButton from "@components/ui/InteractiveButton";
import ansh from "../../../../public/ansh.jpg";
import mike from "../../../../public/mike.jpg";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center pb-20">
      <Container
        id="landing-home"
        className="from-secondary to-background flex h-[600px] w-full flex-col justify-center gap-6 bg-gradient-to-tl to-50% dark:from-amber-950 lg:items-center"
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
        <div className="w-full flex justify-center gap-4">
          <div className="w-full flex justify-end">
            <InteractiveButton
              variant={"traced"}
              className="flex items-center justify-between gap-4"
              idScrollToElement="landing-what-we-do"
            >
              Learn more
              <ArrowDown className="-mb-1 h-5 w-5 animate-bounce" />
            </InteractiveButton>
          </div>
          <div className="w-full flex">
            <Link href="/request">
              <Button className="flex items-center justify-between gap-4">
                Request a job
                <MoveRight />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
      <Container className="from-secondary to-background relative flex w-full flex-col items-center justify-start gap-8 bg-gradient-to-bl to-50% mb-12 dark:from-amber-950">
        <div id="landing-what-we-do" className="absolute -top-28" />
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {servicesCards.map((info) => (
            <ServiceCard key={info.title} info={info} />
          ))}
        </div>
      </Container>
      <Container className="from-secondary to-background flex w-full flex-col items-center justify-center gap-6 bg-gradient-to-tr to-50% dark:from-amber-950">
        <div className="mb-24 flex flex-col items-center justify-center gap-6">
          <div className="my-8 flex flex-col gap-8 sm:flex-row w-full justify-center sm:gap-8 md:gap-16 lg:gap-24">
            <div className="flex flex-col items-center gap-4">
              <p className="text-6xl font-bold">800+</p>
              <p className="text-md text-muted-foreground underline underline-offset-8">
                Jobs requested and completed
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <p className="text-6xl font-bold">200+</p>
              <p className="text-md text-muted-foreground underline underline-offset-8">
                Parents, kids, and families served
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-8 items-center">
            <Carousel />
          </div>
        </div>
      </Container>
      <Container className="from-secondary to-background flex w-full flex-col items-center justify-center gap-8 bg-gradient-to-br to-50% dark:from-amber-950">
        <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">
          Our leaders
        </h1>
        <div className="flex flex-col sm:flex-row gap-12 md:gap-16 lg:gap-24">
          <div className="flex flex-col gap-4 items-center">
            <Image
              src={ansh}
              alt={"Anshuman"}
              width={240}
              height={240}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1 items-center text-center">
              <h4 className="text-xl font-semibold tracking-tight">
                Anshuman Parulekar
              </h4>
              <p>WHS Class of 2024</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <Image
              src={mike}
              alt={"Mike"}
              width={240}
              height={240}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1 items-center text-center">
              <h4 className="text-xl font-semibold tracking-tight">
                Michael Lavelle
              </h4>
              <p>WHS Class of 2024</p>
            </div>
          </div>
        </div>
        <Link href="/request">
          <Button className="flex items-center justify-between gap-4">
            Request a job
            <MoveRight />
          </Button>
        </Link>
      </Container>
    </main>
  );
}
