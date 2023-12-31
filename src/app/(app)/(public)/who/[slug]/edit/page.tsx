import { notFound } from "next/navigation";

import { db } from "@lib/db";
import EditStudentAthleteProfileForm from "./EditStudentAthleteProfileForm";

export const metadata = {
  title: "Edit Student-Athlete Profile",
};

export default async function AddReviewPage({
  params,
}: {
  params: { slug: string };
}) {
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
