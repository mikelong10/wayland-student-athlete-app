import { notFound } from "next/navigation";

import { Role } from "@lib/enums";
import { getCurrentUser } from "@lib/session";
import AddStudentAthleteProfileForm from "./AddStudentAthleteProfileForm";

export default async function AddStudentAthleteProfilePage() {
  const user = await getCurrentUser();

  if (user?.role !== Role.ADMIN) {
    notFound();
  }

  return <AddStudentAthleteProfileForm />;
}
