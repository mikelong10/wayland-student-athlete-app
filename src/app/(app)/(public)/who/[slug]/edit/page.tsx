import { notFound } from "next/navigation";
import { Role } from "@prisma/client";

import { db } from "@lib/db";
import { getCurrentUser } from "@lib/session";
import EditStudentAthleteProfileForm from "./EditStudentAthleteProfileForm";

export default async function EditStudentAthleteProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getCurrentUser();

  if (user?.role !== Role.ADMIN) {
    notFound();
  }

  const studentAthlete = await db.studentAthleteProfile.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      resume: {
        select: {
          id: true,
          text: true,
        },
      },
    },
  });

  if (!studentAthlete) {
    notFound();
  }

  return <EditStudentAthleteProfileForm studentAthlete={studentAthlete} />;
}
