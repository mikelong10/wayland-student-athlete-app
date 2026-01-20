import type { Metadata } from "next";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Login | Wayland Student-Athlete",
  description:
    "Get started with an account to request jobs and track your requested jobs.",
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="min-h-screen">{children}</div>;
}
