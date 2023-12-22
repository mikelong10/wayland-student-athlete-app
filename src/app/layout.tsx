import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "@styles/globals.css";

import { inter } from "@lib/fonts";
import { cn } from "@lib/utils";
import { ThemeProvider } from "@components/ThemeProvider";
import { Toaster } from "@components/ui/toaster";

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
    <html
      className="border-border scroll-smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={cn(
          "bg-background text-foreground min-w-[360px] antialiased",
          inter.className
        )}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
