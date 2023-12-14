import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

import Container from "@components/Container";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@components/ui/card";
import whs from "../../../../../public/whs.jpg";

export const metadata = {
  title: "What we do",
};

export default function WhatWeDoPage() {
  return (
    <Container className="flex h-full min-h-screen w-full max-w-[1600px] flex-col items-center pt-24">
      <div className="flex h-screen w-full flex-col">
        <div className="relative mt-16 flex h-fit w-full items-start sm:mt-8">
          <Card className="xs:w-4/5 dark:shadow-tertiary absolute left-0 z-10 mt-16 flex min-w-[320px] flex-col gap-4 border-none p-6 shadow-2xl sm:w-3/5 sm:min-w-[400px] sm:p-8 md:w-2/5  md:min-w-[480px] md:p-10 lg:min-w-[560px] lg:p-12">
            <CardTitle className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Our mission
            </CardTitle>
            <CardContent className="flex flex-col gap-1 sm:gap-2">
              <p>
                We are a group of local Wayland High School student-athletes who
                excel both in the classroom and on the field.
              </p>
              <p>
                With our business, we strive to make the lives of every family
                living in Wayland and the surrounding area better and easier by
                providing a simple, trustworthy, and quality way for you to find
                someone to help you out.
              </p>
              <p>
                Whether you need a tutor, a babysitter, or just someone to mow
                your lawn, simply click the “Request a Job” button below to let
                us know, and we will connect you with a member of our team to do
                the job for you!
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/request">
                <Button className="flex items-center justify-between gap-4">
                  Request a job
                  <MoveRight />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <div className="absolute -top-16 left-[10%] sm:-top-8 sm:left-[30%] md:-top-4">
            <Image
              src={whs}
              alt={"Wayland High School"}
              objectFit="contain"
              className="dark:shadow-tertiary rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
