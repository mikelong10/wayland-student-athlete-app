import { generateUniqueId } from "@lib/utils";
import Container from "@components/Container";
import H1 from "@components/typography/h1";
import H2 from "@components/typography/h2";
import { Card, CardContent } from "@components/ui/card";

export const metadata = {
  title: "Privacy Policy | Wayland Student-Athlete",
  description:
    "Learn about how we manage and respect your personal information.",
};

const privacyPolicyData = [
  {
    title: "Information We Collect",
    information: [
      "a. Personal Information: When you use our services, we may collect personal information such as your name, contact details, and payment information.",
      "b. Job Request Information: Information provided by users when submitting job requests, including details about the requested services.",
      "c. Communication Data: Correspondence and communication with Wayland Student-Athlete, including emails, phone calls, and other interactions.",
    ],
  },
  {
    title: "How We Use Your Information",
    information: [
      "a. Service Provision: To fulfill job requests, arrange services, and communicate with users.",
      "b. Payment Processing: To process payments and manage financial transactions.",
      "c. Communication: To respond to inquiries, provide support, and communicate with users about services.",
      "d. Improvements: To analyze and improve our services, website, and user experience.",
    ],
  },
  {
    title: "Information Sharing",
    information: [
      "We do not sell, trade, or otherwise transfer your personal information to outside parties. However, we may share information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.",
    ],
  },
  {
    title: "Data Security",
    information: [
      "We implement security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Third-Party Links",
    information: [
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites.",
    ],
  },
  {
    title: "Changes to Privacy Policy",
    information: [
      "We may update this Privacy Policy from time to time. Changes will be reflected on this page, and the date of the latest update will be indicated.",
    ],
  },
  {
    title: "Contact Information",
    information: [
      "If you have any questions or concerns about this Privacy Policy, please contact us at waylandstudentathlete@gmail.com.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <Container className="flex min-h-screen w-full flex-col justify-center gap-6 pb-12 pt-32 md:w-5/6 xl:w-4/6">
      <div className="flex flex-col gap-1">
        <H1>Privacy Policy</H1>
        <p className="text-muted-foreground">
          Last Updated: Tuesday, December 19, 2023
        </p>
      </div>
      <Card>
        <CardContent className="flex flex-col gap-2">
          <p>
            Welcome to Wayland Student-Athlete! We invite you to read our
            Privacy Policy carefully before using our website or services.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, and safeguard your
            personal information when you use our website and services.
          </p>
          <p>Thank you for choosing Wayland Student-Athlete!</p>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-4">
        {privacyPolicyData.map((bullet, idx) => (
          <div key={bullet.title} className="flex flex-col gap-3">
            <H2 className="text-xl md:text-2xl">{`${idx + 1}. ${
              bullet.title
            }`}</H2>
            <ul className="flex flex-col gap-2">
              {bullet.information.map((info) => (
                <li
                  key={generateUniqueId(info)}
                  className="text-accent-foreground pl-6 leading-6"
                >
                  {info}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}
