import { getStudentAthleteProfileBySlug } from "@db/queries";
import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import { notFound } from "next/navigation";
import EditStudentAthleteProfileForm from "./EditStudentAthleteProfileForm";

export default async function EditStudentAthleteProfilePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
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
