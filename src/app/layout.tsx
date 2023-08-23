import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@styles/globals.css";

import { cn } from "@lib/utils";
import { ThemeProvider } from "@components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wayland Student-Athlete",
  description: "Simple, trustworthy, quality solutions for all your odd jobs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-w-[360px]", inter.className)}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
