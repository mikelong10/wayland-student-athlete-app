import { Analytics } from "@vercel/analytics/react";

import "@styles/globals.css";

import { ThemeProvider } from "@components/ThemeProvider";
import { Toaster } from "@components/ui/toaster";
import { inter } from "@lib/fonts";
import { cn } from "@lib/utils";

export const metadata = {
  title:
    "Wayland Student-Athlete | Simple, trustworthy, quality solutions for all your odd jobs",
  description:
    "Let us know what tasks you don't have time and energy for. We'll take care of it.",
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
