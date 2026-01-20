"use client";

import H1 from "@components/typography/h1";
import { Button } from "@components/ui/button";
import { RotateCw } from "lucide-react";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-8 text-center">
      <H1>Something went wrong!</H1>
      <Button
        onClick={() => reset()}
        variant={"ghost"}
        className="flex items-center gap-1 pr-6"
      >
        <RotateCw className="size-4" />
        Try again
      </Button>
    </main>
  );
}
