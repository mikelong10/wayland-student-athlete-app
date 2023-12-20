import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MoveRight } from "lucide-react";

import Container from "@components/Container";
import ReviewCarousel from "@components/ReviewCarousel";
import ServicesContent from "@components/ServicesContent";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@components/ui/card";
import InteractiveButton from "@components/ui/InteractiveButton";
import ansh from "../../../../public/ansh.jpg";
import mike from "../../../../public/mike.jpg";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center pb-16">
      <Container
        id="landing-home"
        className="from-tertiary to-background xs:h-[640px] flex h-[600px] w-full flex-col justify-center gap-6 bg-gradient-to-tl to-50% lg:items-center dark:from-orange-950"
      >
        <div className="text-foreground xs:hidden scroll-m-20 text-3xl font-extrabold tracking-tight">
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
        <div className="flex w-full gap-4 lg:justify-center">
          <div className="flex lg:w-full lg:justify-end">
            <InteractiveButton
              variant={"traced"}
              className="xs:gap-4 flex items-center justify-between gap-2"
              idScrollToElement="landing-what-we-do"
            >
              Learn more
              <ArrowDown className="xs:flex -mb-1 hidden h-5 w-5 animate-bounce" />
            </InteractiveButton>
          </div>
          <div className="flex lg:w-full">
            <Link href="/request">
              <Button className="xs:gap-4 flex items-center justify-between gap-2">
                Request a job
                <MoveRight className="xs:flex hidden" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
      <Container className="from-tertiary to-background relative mb-12 flex w-full flex-col items-center justify-start gap-24 bg-gradient-to-bl to-50% dark:from-orange-950">
        <div id="landing-what-we-do" className="absolute -top-28" />
        <ServicesContent />
      </Container>
      <Container className="from-tertiary to-background flex w-full flex-col items-center justify-center gap-6 bg-gradient-to-tr to-50% dark:from-orange-950">
        <div className="mb-24 flex w-full flex-col items-center justify-center gap-20">
          <div className="mt-8 flex w-full flex-col justify-center gap-8 sm:flex-row sm:gap-8 md:gap-16 lg:gap-24">
            <div className="flex flex-col items-center gap-2">
              <p className="text-6xl font-bold">800+</p>
              <p className="text-md text-muted-foreground underline underline-offset-8">
                Jobs requested and completed
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-6xl font-bold">200+</p>
              <p className="text-md text-muted-foreground underline underline-offset-8">
                Parents, kids, and families served
              </p>
            </div>
          </div>
          <Card
            className={
              "dark:shadow-tertiary flex w-fit flex-col gap-2 border-none shadow-2xl md:text-center"
            }
          >
            <CardTitle>
              How may we <span className="text-primary">assist</span> you?
            </CardTitle>
            <CardContent className="text-muted-foreground">
              <p>
                Let us know what tasks you don&apos;t have time and energy for.
              </p>
              <p>We&apos;ll take care of it.</p>
            </CardContent>
            <CardFooter className="w-full md:justify-center">
              <Link href="/request">
                <Button className="mt-4 flex items-center justify-between gap-4">
                  Request a job
                  <MoveRight />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </Container>
      <Container className="from-tertiary to-background flex w-full flex-col items-center justify-center gap-8 bg-gradient-to-br to-50% dark:from-orange-950">
        <div className="mb-20 flex w-full flex-col items-center gap-8">
          <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
            <span className="">Trusted</span> by the{" "}
            <span className="text-secondary italic">community</span>.
          </h2>
          <ReviewCarousel />
        </div>
        <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
          Our Leaders
        </h2>
        <div className="flex flex-col gap-12 sm:flex-row md:gap-16 lg:gap-24">
          <div className="flex flex-col items-center gap-4">
            <Image
              src={ansh}
              alt={"Anshuman"}
              width={240}
              height={240}
              className="rounded-full"
            />
            <div className="flex flex-col items-center gap-1 text-center">
              <h4 className="text-xl font-semibold tracking-tight">
                Anshuman Parulekar
              </h4>
              <p>WHS Class of 2024</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Image
              src={mike}
              alt={"Mike"}
              width={240}
              height={240}
              className="rounded-full"
            />
            <div className="flex flex-col items-center gap-1 text-center">
              <h4 className="text-xl font-semibold tracking-tight">
                Michael Lavelle
              </h4>
              <p>WHS Class of 2024</p>
            </div>
          </div>
        </div>
        <Link href="/what">
          <Button variant={"traced"}>Our mission</Button>
        </Link>
      </Container>
    </main>
  );
}
