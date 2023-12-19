import Container from "@components/Container";
import { Card, CardContent } from "@components/ui/card";

export const metadata = {
  title: "Terms of Service",
};

const terms = [
  {
    title: "Job Requests",
    description:
      "Customers can submit job requests through our website. By submitting a request, you agree to provide accurate and complete information. We reserve the right to decline or modify job requests based on availability, safety concerns, or other factors.",
  },
  {
    title: "Communication",
    description:
      "We will contact customers through the provided email, phone number, or other contact information. It is your responsibility to ensure that the provided information is accurate and up-to-date.",
  },
  {
    title: "Job Agreements",
    description:
      "Once a job request is accepted, we will negotiate and agree upon the time, location, and wage for the job. Both parties are expected to honor the agreed-upon terms.",
  },
  {
    title: "Payments",
    description:
      "Payments for services can be made in cash or through Venmo. Payment details will be discussed and confirmed before completing the job.",
  },
  {
    title: "Safety and Liability",
    description:
      "While providing services, all parties must prioritize safety. Wayland Student-Athlete is not liable for any injuries, damages, or losses incurred during the provision of services.",
  },
  {
    title: "Termination of Services",
    description:
      "We reserve the right to terminate or refuse services for any reason, including but not limited to safety concerns, inappropriate behavior, or violation of these terms.",
  },
  {
    title: "Changes to Terms",
    description:
      "We may update these Terms of Service from time to time. You will be notified of any changes, and continued use of our services constitutes acceptance of the updated terms.",
  },
  {
    title: "Contact Information",
    description:
      "If you have any questions or concerns regarding these terms, please contact us at waylandstudentathlete@gmail.com.",
  },
];

export default function PrivacyPolicy() {
  return (
    <Container className="flex min-h-screen w-full flex-col justify-center gap-6 pb-24 pt-36 md:w-5/6 xl:w-4/6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Terms & Conditions
        </h1>
        <p className="text-muted-foreground">
          Last Updated: Tuesday, December 19, 2023
        </p>
      </div>
      <Card>
        <CardContent className="flex flex-col gap-2">
          <p>
            Welcome to Wayland Student-Athlete! Please read these Terms of
            Service carefully before using our website or services.
          </p>
          <p>
            By accessing or using Wayland Student-Athlete&apos;s website and
            services, you agree to comply with and be bound by these Terms of
            Service.
          </p>
          <p>Thank you for choosing Wayland Student-Athlete!</p>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-4">
        {terms.map((term, idx) => (
          <div key={term.title} className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight">{`${idx + 1}. ${
              term.title
            }`}</h2>
            <p className="text-accent-foreground pl-6">{term.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
