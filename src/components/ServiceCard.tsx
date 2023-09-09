import {
  Armchair,
  Baby,
  Car,
  GraduationCap,
  Medal,
  Shovel,
  Snowflake,
  Wrench,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import InteractiveButton from "@components/ui/InteractiveButton";

type ServiceCardInfo = {
  icon: JSX.Element;
  title: string;
  description: string;
  reviewSectionId?: string;
};
export const servicesCards: ServiceCardInfo[] = [
  {
    icon: <Armchair className="h-8 w-8" />,
    title: "Moving jobs",
    description:
      "Whether it's just household furniture that needs to be rearranged or if your planning on moving, we've done it countless times before and we know how to help you out! Check out our services below for more!",
    reviewSectionId: "moving-services",
  },
  {
    icon: <Shovel className="h-8 w-8" />,
    title: "Yard work",
    description:
      "If you don't like doing yard work, don't have time for it, or can't do it yourself, we would be glad to help you out. As student-athletes, we can handle the physical labor of mowing a lawn, raking leaves, weeding, and other landscaping tasks.",
    reviewSectionId: "yard-work-services",
  },
  {
    icon: <Baby className="h-8 w-8" />,
    title: "Babysitting",
    description:
      "Wayland Student-Athlete makes finding a sitter easier than ever before! Rather than relying on a single sitter for availability, we can quickly connect you with a student-athlete from our wide selection of kind, responsible, and experienced babysitters so that you can always have the freedom to go out and feel safe leaving your kids at home.",
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Tutoring",
    description:
      "Biology, Algebra, U.S. History, Spanish, Computer Science... You name it, we have students who've taken these courses at the Honors and AP® level, and we can help!",
  },
  {
    icon: <Snowflake className="h-8 w-8" />,
    title: "Snow removal",
    description: "Unexpected snow storm? We've got you covered.",
  },
  {
    icon: <Medal className="h-8 w-8" />,
    title: "Sports training",
    description:
      "With athletes on the varsity soccer, basketball, baseball, tennis teams, and more, we know we can help your kid (or you!) improve.",
  },
  {
    icon: <Car className="h-8 w-8" />,
    title: "Car Rides / Deliveries",
    description:
      "If you're not available to drive your kid to school in the morning, drop them off at their practices/games/lessons, or need a delivery done for you, we have a number of safe and responsible drivers who can do the job for you.",
  },
  {
    icon: <Wrench className="h-8 w-8" />,
    title: "Other odd jobs and projects",
    description:
      "From assemblies to painting, we are confident that we will be able to help you out. If it seems outside the box, ask us anyway! (These jobs are usually our favorite!)",
  },
];

export default function ServiceCard({ info }: { info: ServiceCardInfo }) {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader className="flex gap-4">
        {info.icon}
        <CardTitle>{info.title}</CardTitle>
      </CardHeader>
      <div className="flex h-full flex-col justify-between gap-4">
        <CardContent>
          <p>{info.description}</p>
        </CardContent>
        {info.reviewSectionId && (
          <CardFooter>
            <InteractiveButton idScrollToElement={info.reviewSectionId}>
              Reviews
            </InteractiveButton>
          </CardFooter>
        )}
      </div>
    </Card>
  );
}
