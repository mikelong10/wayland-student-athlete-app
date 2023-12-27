import Image from "next/image";
import { notFound } from "next/navigation";

import { studentAthletes } from "@lib/data";
import Container from "@components/Container";
import H2 from "@components/typography/h2";

export default function StudentAthletePage({
  params,
}: {
  params: { slug: string };
}) {
  const studentAthlete = studentAthletes.get(params.slug);

  if (!studentAthlete) {
    notFound();
  }

  const resumeItems = studentAthlete.resume.map((item) => (
    <li key={item}>{item}</li>
  ));

  return (
    <Container className="flex min-h-screen flex-col justify-center pb-12 pt-32">
      {/* small */}
      <div className="xs:hidden flex flex-col gap-4">
        <div className="flex w-full justify-center">
          <Image
            src={studentAthlete.image}
            alt={studentAthlete.name}
            className="w-[312px] rounded-lg"
          />
        </div>
        <div className="flex flex-col text-center">
          <H2 className="text-xl">{studentAthlete.name}</H2>
          <p className="text-muted-foreground">{`Class of ${studentAthlete.year}`}</p>
        </div>
        <ul className="flex list-disc flex-col gap-1 pl-4">{resumeItems}</ul>
      </div>
      {/* medium */}
      <div className="xs:flex hidden flex-col gap-4 lg:hidden">
        <div className="flex items-center gap-8">
          <Image
            src={studentAthlete.image}
            alt={studentAthlete.name}
            className="w-[312px] rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <H2 className="text-2xl md:text-3xl">{studentAthlete.name}</H2>
            <p className="text-muted-foreground">{`Class of ${studentAthlete.year}`}</p>
          </div>
        </div>
        <ul className="flex list-disc flex-col gap-1 pl-4">{resumeItems}</ul>
      </div>
      {/* large */}
      <div className="hidden gap-16 lg:flex">
        <div className="flex items-center">
          <Image
            src={studentAthlete.image}
            alt={studentAthlete.name}
            className="dark:shadow-tertiary max-w-[400px] rounded-lg shadow-2xl"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col xl:gap-1">
            <H2 className="text-3xl xl:text-4xl">{studentAthlete.name}</H2>
            <p className="text-muted-foreground text-xl font-semibold tracking-tight">{`Class of ${studentAthlete.year}`}</p>
          </div>
          <ul className="flex list-disc flex-col gap-1 pl-4">{resumeItems}</ul>
        </div>
      </div>
    </Container>
  );
}
