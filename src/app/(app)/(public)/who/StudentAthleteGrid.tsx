import Image from "next/image";
import Link from "next/link";
import { db } from "@db";
import { studentAthleteProfiles } from "@db/schema/content";
import { SquareUser } from "lucide-react";

import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import H2 from "@components/typography/h2";
import { Button } from "@components/ui/button";

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

export async function StudentAthleteGrid() {
  const [user, studentAthleteProfileItems] = await Promise.all([
    getCurrentUser(),
    db.select().from(studentAthleteProfiles),
  ]);

  return (
    <>
      {user?.role === Role.ADMIN && (
        <Button asChild variant={"outline"} className="mb-4 w-fit">
          <Link href={"/who/add"} className="flex gap-2">
            <SquareUser />
            Add profile
          </Link>
        </Button>
      )}
      <div className="mt-6 flex flex-col items-center">
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {studentAthleteProfileItems.map((studentAthleteProfile) => (
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
    </>
  );
}

export function StudentAthleteGridSkeleton() {
  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="bg-muted h-[256px] w-full animate-pulse rounded-md sm:h-[256px] md:h-[304px] lg:h-[256px] xl:h-[320px] 2xl:h-[262px]" />
            <div className="flex flex-col items-center gap-2">
              <div className="bg-muted h-6 w-32 animate-pulse rounded" />
              <div className="bg-muted h-5 w-24 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
