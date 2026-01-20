import ServiceCard from "@components/ServiceCard";
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

export type ServiceCardInfo = {
  icon: JSX.Element;
  title: string;
  description: string;
  reviewSectionId?: string;
};

const cardIconStyle = "h-8 w-8 text-secondary";
export const servicesCards: ServiceCardInfo[] = [
  {
    icon: <Armchair className={cardIconStyle} />,
    title: "Moving Jobs",
    description:
      "Whether it's just household furniture that needs to be rearranged or if your planning on moving, we've done it countless times before and we know how to help you out! Check out our services below for more!",
    reviewSectionId: "moving-services",
  },
  {
    icon: <Shovel className={cardIconStyle} />,
    title: "Yard Work",
    description:
      "If you don't like doing yard work, don't have time for it, or can't do it yourself, we would be glad to help you out. As student-athletes, we can handle the physical labor of mowing a lawn, raking leaves, weeding, and other landscaping tasks.",
    reviewSectionId: "yard-work-services",
  },
  {
    icon: <GraduationCap className={cardIconStyle} />,
    title: "Tutoring",
    description:
      "Biology, Algebra, U.S. History, Spanish, Computer Science... You name it, we have students who've taken these courses at the Honors and AP® level, and we can help!",
  },
  {
    icon: <Medal className={cardIconStyle} />,
    title: "Sports Training",
    description:
      "With athletes on the varsity soccer, basketball, baseball, tennis teams, and more, we know we can help your kid (or you!) improve.",
  },
  {
    icon: <Baby className={cardIconStyle} />,
    title: "Babysitting",
    description:
      "Rather than relying on a single sitter for availability, we can quickly connect you with a student-athlete from our wide selection of kind, responsible, and experienced babysitters so that you can always have the freedom to go out and feel safe leaving your kids at home.",
  },
  {
    icon: <Car className={cardIconStyle} />,
    title: "Car Rides / Deliveries",
    description:
      "If you're not available to drive your kid to school in the morning, drop them off at their practices/games/lessons, or need a delivery done for you, we have a number of safe and responsible drivers who can do the job for you.",
  },
  {
    icon: <Snowflake className={cardIconStyle} />,
    title: "Snow Removal",
    description: "Unexpected snow storm? We've got you covered.",
  },
  {
    icon: <Wrench className={cardIconStyle} />,
    title: "Other Odd Jobs",
    description:
      "From assemblies to painting, we are confident that we will be able to help you out. If it seems outside the box, ask us anyway! (These jobs are usually our favorite!)",
  },
];

export default function ServicesContent() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
      {servicesCards.map((info) => (
        <ServiceCard key={info.title} info={info} />
      ))}
    </div>
  );
}
