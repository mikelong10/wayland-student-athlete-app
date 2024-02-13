import Image from "next/image";
import Link from "next/link";
import { BookMarked, MoveRight, Users } from "lucide-react";

import Container from "@components/Container";
import H1 from "@components/typography/h1";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import whs from "../../../../../public/whs.jpg";
import wooHigh from "../../../../../public/woo-high-l.jpg";

export const metadata = {
  title: "What We Do | Wayland Student-Athlete",
  description: "Learn about our mission and story of how we got started.",
};

export default function WhatWeDoPage() {
  return (
    <>
      <Container className="flex size-full min-h-screen max-w-[1600px] flex-col items-center">
        <div className="flex h-screen w-full flex-col pb-20 pt-32">
          <div className="relative h-screen w-full">
            <Card className="xs:w-4/5 dark:shadow-tertiary xs:bottom-4 absolute bottom-0 left-0 z-10 flex min-w-[320px] flex-col gap-4 border-none p-6 shadow-2xl sm:bottom-8 sm:w-3/5 sm:min-w-[400px] sm:p-8 md:bottom-12 md:w-2/5 md:min-w-[480px] md:p-10 lg:bottom-16 lg:min-w-[560px] lg:p-12 xl:bottom-20">
              <H1>Our Mission</H1>
              <CardContent className="flex flex-col gap-1 sm:gap-2">
                <p>
                  We are a group of local Wayland High School student-athletes
                  who excel both in the classroom and on the field.
                </p>
                <p>
                  With our business, we strive to make the lives of every family
                  living in Wayland and the surrounding area better and easier
                  by providing a simple, trustworthy, and quality way for you to
                  find someone to help you out.
                </p>
                <p>
                  Whether you need a tutor, a babysitter, or just someone to mow
                  your lawn, simply click the “Request a Job” button below to
                  let us know, and we will connect you with a member of our team
                  to do the job for you!
                </p>
              </CardContent>
              <CardFooter className="mt-2">
                <Link href="/request">
                  <Button className="flex items-center justify-between gap-4">
                    Request a job
                    <MoveRight />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <div className="xs:-top-2 absolute -top-4 left-[10%] sm:left-[30%] sm:top-0">
              <Image
                src={whs}
                alt={"Wayland High School"}
                style={{ objectFit: "contain" }}
                className="dark:shadow-tertiary rounded-md shadow-2xl"
              />
            </div>
          </div>
        </div>
      </Container>
      <Container className="bg-cream flex size-full min-h-screen flex-col items-center justify-center py-12">
        <Card className="bg-secondary text-background dark:shadow-tertiary flex w-full max-w-6xl flex-col gap-4 border-none shadow-2xl sm:p-10 md:p-12 lg:p-14 xl:p-16">
          <div className="flex items-end gap-4">
            <BookMarked className="text-tertiary -ml-1 h-12 w-10 sm:h-14 sm:w-12 lg:h-16 lg:w-14" />
            <H1 className="text-background">Our Story</H1>
          </div>
          <Separator className="bg-tertiary mb-4" />
          <CardContent>
            <div className="flex flex-col-reverse items-center gap-4 lg:flex-row lg:gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-background">
                  <span className="font-semibold">WSA</span> was founded in May
                  2020 by a group of friends in the WHS Class of 2021 with the
                  goal of providing simple, trustworthy, quality services to
                  families in Wayland.
                </p>
                <p className="text-background">
                  When the COVID-19 pandemic struck, we decided to start a
                  business together with the newfound free time on our hands. As
                  a sharp group of students in AP and Honors classes and a
                  strong bunch of athletes in a variety of varsity sports, we
                  recognized and believed we could use our abilities to not only
                  earn some money but, more importantly, also provide value to
                  the community.
                </p>
                <p className="text-background">
                  Now, the business has twice been passed down as each group
                  graduates Wayland High School and moves on to college. We are
                  proud to continue the legacy of the original founders and are
                  excited to continue to serve the Wayland community.
                </p>
                <Button
                  asChild
                  variant={"tertiary"}
                  className="mt-2 flex w-fit items-center gap-4"
                >
                  <Link href="/who">
                    <Users />
                    Meet our people
                  </Link>
                </Button>
              </div>
              <div>
                <Image
                  src={wooHigh}
                  alt={"Founders picture"}
                  style={{ objectFit: "cover" }}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
