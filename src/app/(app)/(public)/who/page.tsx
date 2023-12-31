import Image from "next/image";
import Link from "next/link";
import { Role } from "@prisma/client";
import { SquareUser } from "lucide-react";

import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import Container from "@components/Container";
import H1 from "@components/typography/h1";
import H2 from "@components/typography/h2";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";

export const metadata = {
  title: "Who we are",
};

const StudentAthleteCard = ({
  name,
  title,
  image,
  slug,
}: {
  name: string;
  title: string;
  image: string;
  slug: string;
}) => (
  <Link href={`/who/${slug}`}>
    <div className="group flex cursor-pointer flex-col gap-4">
      <Image
        src={image}
        alt={`Student-Athlete profile image for ${name}`}
        width={400}
        height={400}
        style={{ objectFit: "cover" }}
        className="rounded-md transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-80 group-hover:shadow-xl sm:h-[256px] md:h-[304px] lg:h-[256px] xl:h-[320px] 2xl:h-[262px]"
      />
      <div className="flex flex-col items-center">
        <H2 className="xs:text-xl w-full flex-1 text-center text-xl font-semibold sm:text-xl">
          {name}
        </H2>
        <p className="text-muted-foreground w-full text-center text-lg font-semibold">
          {title}
        </p>
      </div>
    </div>
  </Link>
);

export default async function WhoWeArePage() {
  const user = await getCurrentUser();

  const studentAthleteProfiles = await db.studentAthleteProfile.findMany();

  return (
    <Container className="flex h-full min-h-screen w-full flex-col items-center justify-center pb-12 pt-32">
      <div className="xs:w-[416px] flex w-[312px] flex-col gap-6 sm:w-[544px] md:w-[640px] lg:w-[832px] xl:w-[1024px] 2xl:w-[1144px]">
        <div className="flex flex-col gap-4">
          <H1>Our People</H1>
          <H2>Meet the Student-Athletes</H2>
          {user?.role === Role.ADMIN && (
            <Button asChild variant={"outline"} className="w-fit">
              <Link href={"/who/add"} className="flex gap-2">
                <SquareUser />
                Add profile
              </Link>
            </Button>
          )}
        </div>
        <Separator />
        <div className="mt-6 flex flex-col items-center">
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {studentAthleteProfiles.map((studentAthleteProfile) => (
              <StudentAthleteCard
                key={studentAthleteProfile.id}
                name={studentAthleteProfile.name}
                title={studentAthleteProfile.title}
                image={studentAthleteProfile.displayImage}
                slug={studentAthleteProfile.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
