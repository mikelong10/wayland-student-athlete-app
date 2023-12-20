import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { studentAthletes } from "@lib/data";
import Container from "@components/Container";
import { Separator } from "@components/ui/separator";

export const metadata = {
  title: "Who we are",
};

const StudentAthleteCard = ({
  name,
  year,
  image,
  slug,
}: {
  name: string;
  year: number;
  image: StaticImageData;
  resume: string[];
  slug: string;
}) => (
  <Link href={`/who/${slug}`}>
    <div className="group flex cursor-pointer flex-col gap-4">
      <Image
        src={image}
        alt={name}
        className="rounded-lg transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-80 group-hover:shadow-xl"
      />
      <div className="flex flex-col items-center">
        <h2 className="w-full flex-1 text-center text-lg font-semibold">
          {name}
        </h2>
        <p className="text-muted-foreground w-full text-center">{`Class of ${year}`}</p>
      </div>
    </div>
  </Link>
);

export default function WhoWeArePage() {
  return (
    <Container className="flex h-full min-h-screen w-full max-w-[1600px] flex-col items-center justify-center pb-12 pt-24">
      <div className="xs:w-[416px] flex w-[312px] flex-col gap-2 sm:w-[544px] md:w-[640px] lg:w-[832px] xl:w-[1024px] 2xl:w-[1144px]">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Our People
          </h1>
          <h2 className="text-muted-foreground text-lg font-bold tracking-tight sm:text-xl">
            Meet the Student-Athletes
          </h2>
        </div>
        <Separator />
        <div className="mt-6 flex flex-col items-center">
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {Array.from(studentAthletes).map(([key, studentAthlete]) => (
              <StudentAthleteCard
                key={key}
                name={studentAthlete.name}
                year={studentAthlete.year}
                image={studentAthlete.image}
                resume={studentAthlete.resume}
                slug={studentAthlete.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
