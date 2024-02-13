import Link from "next/link";
import { ArrowDown, HeartHandshake, MoveRight, Sparkles } from "lucide-react";

import Container from "@components/Container";
import HomePageReviewCarousel from "@components/HomePageReviewCarousel";
import ServicesContent from "@components/ServicesContent";
import H1 from "@components/typography/h1";
import H2 from "@components/typography/h2";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import InteractiveButton from "@components/ui/InteractiveButton";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <Container
        id="landing-home"
        className="from-tertiary to-background xs:h-[640px] flex h-[600px] w-full flex-col justify-center gap-10 bg-gradient-to-tl to-50% py-10 lg:items-center"
      >
        <div className="flex w-full flex-col gap-4 lg:items-center">
          <Badge className=" bg-accent text-accent-foreground h-auto w-fit px-3 py-1 hover:opacity-100">
            <div className="flex items-center gap-3 font-semibold tracking-tight">
              <p>🎉</p>
              <p className="w-fit">
                {
                  "We've updated our website. Log in and enjoy the new experience!"
                }
              </p>
              <Sparkles className="text-foreground xs:size-5 size-6" />
            </div>
          </Badge>
          <div className="xs:hidden">
            <H1>Wayland</H1>
            <H1>Student-Athlete</H1>
          </div>
          <H1 className="max-xs:hidden xs:text-4xl xl:text-6xl">
            Wayland Student-Athlete
          </H1>
          <p className="text-foreground-less scroll-m-20 text-xl font-medium tracking-tight md:text-2xl">
            Simple, trustworthy, quality{" "}
            <span className="text-primary">solutions</span> for all your{" "}
            <span className="text-primary">odd jobs</span>.
          </p>
        </div>
        <div className="flex w-full gap-4 lg:justify-center">
          <div className="flex lg:w-full lg:justify-end">
            <InteractiveButton
              variant={"traced"}
              className="xs:gap-4 flex items-center justify-between gap-2"
              idScrollToElement="landing-what-we-do"
            >
              Learn more
              <ArrowDown className="xs:flex -mb-1 hidden size-5 animate-bounce" />
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
      <Container className="from-tertiary to-background relative flex w-full flex-col items-center justify-start gap-24 bg-gradient-to-bl to-50% py-10">
        <div id="landing-what-we-do" className="absolute -top-28" />
        <ServicesContent />
      </Container>
      <Container className="from-tertiary to-background flex w-full flex-col items-center justify-center gap-6 bg-gradient-to-tr to-50% py-20">
        <div className="flex w-full flex-col items-center justify-center gap-32">
          <div className="mt-8 flex w-full flex-col justify-center gap-8 sm:flex-row sm:gap-8 md:gap-16 lg:gap-24">
            <div className="flex flex-col items-center gap-2 text-center">
              <H2 className="xs:text-6xl text-5xl sm:text-6xl">
                800<span className="text-primary">+</span>
              </H2>
              <p className="text-accent-foreground text-lg font-semibold underline underline-offset-8">
                Jobs requested and completed
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <H2 className="xs:text-6xl text-5xl sm:text-6xl">
                200<span className="text-primary">+</span>
              </H2>
              <p className="text-accent-foreground text-lg font-semibold underline underline-offset-8">
                Parents, kids, and families served
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-8">
            <H2 className="xs:text-3xl text-center text-3xl md:text-4xl">
              <span className="">Trusted</span> by the{" "}
              <span className="text-secondary italic">community</span>.
            </H2>
            <HomePageReviewCarousel />
          </div>
        </div>
      </Container>
      <Container className="from-tertiary to-background flex w-full flex-col items-center justify-center gap-8 bg-gradient-to-br to-50% pb-32 pt-16">
        <Card
          className={
            "bg-secondary xs:p-10 flex w-fit flex-col items-center gap-2 border-none p-8 text-center shadow-2xl md:p-12 lg:p-14 xl:p-16"
          }
        >
          <div className="flex flex-col items-center gap-2">
            <HeartHandshake className="text-tertiary size-12" />
            <H2 className="text-background">
              How may we <span className="text-primary italic">assist</span>{" "}
              you?
            </H2>
          </div>
          <CardContent className="text-accent">
            <p>
              Let us know what tasks you don&apos;t have time and energy for.
            </p>
            <p>We&apos;ll take care of it.</p>
          </CardContent>
          <CardFooter>
            <Link href="/request">
              <Button className="mt-4 flex items-center justify-between gap-4">
                Request a job
                <MoveRight />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </Container>
    </main>
  );
}
