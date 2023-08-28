import Link from "next/link";
import {
  Armchair,
  ArrowDown,
  Baby,
  Car,
  GraduationCap,
  Medal,
  MoveRight,
  Shovel,
  Snowflake,
  Wrench,
} from "lucide-react";

import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import InteractiveButton from "@components/ui/InteractiveButton";

type ServiceCard = {
  icon: JSX.Element;
  title: string;
  description: string;
  reviewSectionId?: string;
};
const servicesCards: ServiceCard[] = [
  {
    icon: <Armchair className="h-8 w-8" />,
    title: "Moving jobs",
    description:
      "Whether it's just household furniture that needs to be rearranged or if your planning on moving, we've done it countless times before and we know how to help you out! Check out our services below for more!",
    reviewSectionId: "moving-services",
  },
  {
    icon: <Shovel className="h-8 w-8" />,
    title: "Yard work",
    description:
      "If you don't like doing yard work, don't have time for it, or can't do it yourself, we would be glad to help you out. As student-athletes, we can handle the physical labor of mowing a lawn, raking leaves, weeding, and other landscaping tasks.",
    reviewSectionId: "yard-work-services",
  },
  {
    icon: <Baby className="h-8 w-8" />,
    title: "Babysitting",
    description:
      "Wayland Student-Athlete makes finding a sitter easier than ever before! Rather than relying on a single sitter for availability, we can quickly connect you with a student-athlete from our wide selection of kind, responsible, and experienced babysitters so that you can always have the freedom to go out and feel safe leaving your kids at home.",
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Tutoring",
    description:
      "Biology, Algebra, U.S. History, Spanish, Computer Science... You name it, we have students who've taken these courses at the Honors and AP® level, and we can help!",
  },
  {
    icon: <Snowflake className="h-8 w-8" />,
    title: "Snow removal",
    description: "Unexpected snow storm? We've got you covered.",
  },
  {
    icon: <Medal className="h-8 w-8" />,
    title: "Sports training",
    description:
      "With athletes on the varsity soccer, basketball, baseball, tennis teams, and more, we know we can help your kid (or you!) improve.",
  },
  {
    icon: <Car className="h-8 w-8" />,
    title: "Car Rides / Deliveries",
    description:
      "If you're not available to drive your kid to school in the morning, drop them off at their practices/games/lessons, or need a delivery done for you, we have a number of safe and responsible drivers who can do the job for you.",
  },
  {
    icon: <Wrench className="h-8 w-8" />,
    title: "Other odd jobs and projects",
    description:
      "From assemblies to painting, we are confident that we will be able to help you out. If it seems outside the box, ask us anyway! (These jobs are usually our favorite!)",
  },
];

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center pb-20">
      <section
        id="landing-home"
        className="from-secondary to-background flex min-h-screen w-full flex-col justify-center gap-6 bg-gradient-to-tl to-50% px-6 dark:from-amber-950 md:px-10 lg:px-16 xl:px-24"
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
      </section>
      <section
        className="from-secondary to-background relative flex w-full flex-col items-center justify-start gap-8 bg-gradient-to-bl to-50% px-6 pb-16 dark:from-amber-950 md:px-10
        lg:px-16 xl:px-24"
      >
        <div id="landing-what-we-do" className="absolute -top-28 bg-red-500" />
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl xl:text-5xl">
          Our services
        </h1>
        <div className="xs:px-6 grid w-full grid-cols-1 gap-4 sm:px-12 md:grid-cols-2 md:px-16">
          {servicesCards.map((service) => (
            <Card key={service.title} className="flex flex-col gap-4">
              <CardHeader className="flex gap-4">
                {service.icon}
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <div className="flex h-full flex-col justify-between gap-4">
                <CardContent>
                  <p>{service.description}</p>
                </CardContent>
                {service.reviewSectionId && (
                  <CardFooter>
                    <InteractiveButton
                      idScrollToElement={service.reviewSectionId}
                    >
                      Reviews
                    </InteractiveButton>
                  </CardFooter>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>
      <section
        className="from-secondary to-background flex w-full flex-col items-center justify-center gap-6 bg-gradient-to-tr to-50% px-6 dark:from-amber-950 md:px-10
lg:px-16 xl:px-24"
      >
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
      </section>
      <section
        className="from-secondary to-background flex w-full flex-col items-center justify-center gap-6 bg-gradient-to-br to-50% px-6 dark:from-amber-950 md:px-10
lg:px-16 xl:px-24"
      >
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
      </section>
    </main>
  );
}
