import { Suspense } from "react";

import Container from "@components/Container";
import H1 from "@components/typography/h1";
import H2 from "@components/typography/h2";
import { Separator } from "@components/ui/separator";
import {
  StudentAthleteGrid,
  StudentAthleteGridSkeleton,
} from "./StudentAthleteGrid";

export const metadata = {
  title: "Who We Are | Wayland Student-Athlete",
  description:
    "Meet the phenomenal team of Student-Athletes providing you with the best service possible.",
};

export default function WhoWeArePage() {
  return (
    <Container className="flex size-full min-h-screen flex-col items-center justify-center pb-20 pt-32">
      <div className="xs:w-[416px] flex w-[312px] flex-col gap-6 sm:w-[544px] md:w-[640px] lg:w-[832px] xl:w-[1024px] 2xl:w-[1144px]">
        <div className="flex flex-col gap-4">
          <H1>Our People</H1>
          <H2>Meet the Student-Athletes</H2>
        </div>
        <Separator />
        <Suspense fallback={<StudentAthleteGridSkeleton />}>
          <StudentAthleteGrid />
        </Suspense>
      </div>
    </Container>
  );
}
