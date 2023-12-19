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
    <div className="group flex w-[256px] cursor-pointer flex-col gap-4">
      <Image
        src={image}
        alt={name}
        className="rounded-lg transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-80 group-hover:shadow-xl"
      />
      <div className="flex flex-col items-center">
        <h2 className="text-secondary flex-1 text-lg font-semibold">{name}</h2>
        <p className="text-muted-foreground w-28">{`Class of ${year}`}</p>
      </div>
    </div>
  </Link>
);

export default function WhoWeArePage() {
  return (
    <Container className="flex h-full min-h-screen w-full max-w-[1600px] flex-col justify-center gap-12 pb-24 pt-36">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Our People
        </h1>
        <Separator />
      </div>
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-accent-foreground text-xl font-bold tracking-tight sm:text-2xl">
          Meet the Student-Athletes
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
    </Container>
  );
}
