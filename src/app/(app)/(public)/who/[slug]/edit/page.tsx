import { notFound } from "next/navigation";
import { getStudentAthleteProfileBySlug } from "@db/queries";

import { Role } from "@lib/enums";
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

  const studentAthlete = await getStudentAthleteProfileBySlug(params.slug);

  if (!studentAthlete) {
    notFound();
  }

  return <EditStudentAthleteProfileForm studentAthlete={studentAthlete} />;
}
