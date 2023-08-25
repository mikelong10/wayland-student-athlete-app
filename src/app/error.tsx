"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";

import { Button } from "@components/ui/button";

export default function Error({
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
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-extrabold tracking-tight">
        Something went wrong!
      </h1>
      <Button
        onClick={() => reset()}
        variant={"ghost"}
        className="flex items-center gap-1 pr-6"
      >
        <RotateCw className="h-4 w-4" />
        Try again
      </Button>
    </main>
  );
}
