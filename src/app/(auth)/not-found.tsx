import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import H1 from "@components/typography/h1";
import { Button } from "@components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <H1>Whoops!</H1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">
        <Button variant={"ghost"} className="flex items-center gap-1 pr-6">
          <ChevronLeft className="size-4" />
          Back to home
        </Button>
      </Link>
    </main>
  );
}
