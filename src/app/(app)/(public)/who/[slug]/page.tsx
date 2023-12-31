import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Role } from "@prisma/client";
import { Pencil } from "lucide-react";

import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import { AdminActions } from "@components/AdminActions";
import Container from "@components/Container";
import H2 from "@components/typography/h2";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import DeleteStudentAthleteProfileDialog from "./DeleteStudentAthleteProfileDialog";

export default async function StudentAthletePage({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getCurrentUser();

  const studentAthlete = await db.studentAthleteProfile.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      resume: true,
    },
  });

  if (!studentAthlete) {
    notFound();
  }

  const resumeItems = studentAthlete.resume.map((item) => (
    <li key={item.text}>{item.text}</li>
  ));

  return (
    <Container className="flex min-h-screen flex-col items-center justify-center pb-12 pt-32">
      {/* small */}
      <div className="flex flex-col gap-4 sm:hidden">
        <div className="flex w-full justify-center">
          <Image
            src={studentAthlete.displayImage}
            alt={`Student-Athlete profile image for ${studentAthlete.name}`}
            width={800}
            height={800}
            className="max-w-[312px] rounded-md"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <H2 className="text-xl">{studentAthlete.name}</H2>
          <div className="flex items-center gap-2">
            <p className="text-accent-foreground text-lg font-semibold">
              {studentAthlete.title}
            </p>
            <Separator orientation="vertical" className="h-6" />
            <p className="text-muted-foreground font-semibold">{`c/o ${studentAthlete.graduationYear}`}</p>
          </div>
        </div>
        <ul className="flex list-disc flex-col gap-1 pl-4">{resumeItems}</ul>
      </div>
      {/* medium */}
      <div className="hidden flex-col gap-4 sm:flex lg:hidden">
        <div className="flex items-center gap-8">
          <Image
            src={studentAthlete.displayImage}
            alt={`Student-Athlete profile image for ${studentAthlete.name}`}
            width={800}
            height={800}
            className="max-w-[360px] rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <H2 className="text-2xl md:text-3xl">{studentAthlete.name}</H2>
            <p className="text-accent-foreground text-xl font-semibold">
              {studentAthlete.title}
            </p>
            <p className="text-muted-foreground text-lg font-semibold">{`c/o ${studentAthlete.graduationYear}`}</p>
          </div>
        </div>
        <ul className="flex list-disc flex-col gap-1 pl-4">{resumeItems}</ul>
      </div>
      {/* large */}
      <div className="hidden gap-16 lg:flex lg:items-center">
        <div className="flex items-center">
          <Image
            src={studentAthlete.displayImage}
            alt={`Student-Athlete profile image for ${studentAthlete.name}`}
            width={800}
            height={800}
            className="dark:shadow-tertiary max-w-[400px] rounded-xl shadow-2xl"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <H2 className="lg:text-4xl">{studentAthlete.name}</H2>
            <div className="flex items-end gap-3">
              <p className="text-accent-foreground w-fit text-2xl font-semibold">
                {studentAthlete.title}
              </p>
              <Separator orientation="vertical" className="h-8" />
              <p className="text-muted-foreground w-28 text-nowrap text-xl font-semibold tracking-tight">{`c/o ${studentAthlete.graduationYear}`}</p>
            </div>
          </div>
          <ul className="flex list-disc flex-col gap-1 pl-4">{resumeItems}</ul>
        </div>
      </div>
      {user?.role === Role.ADMIN && (
        <AdminActions
          title="Manage profile"
          className="bg-accent mt-10 w-[256px]"
        >
          <div className="flex w-full items-center justify-center gap-4">
            <Button asChild variant={"traced"}>
              <Link href={`/who/${params.slug}/edit`} className="flex gap-3">
                <Pencil className="text-secondary h-5 w-5" />
                Edit
              </Link>
            </Button>
            <DeleteStudentAthleteProfileDialog
              studentAthlete={studentAthlete}
            />
          </div>
        </AdminActions>
      )}
    </Container>
  );
}
