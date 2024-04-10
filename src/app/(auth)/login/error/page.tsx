import Link from "next/link";
import { KeyRound } from "lucide-react";

import H1 from "@components/typography/h1";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Button } from "@components/ui/button";

export default function LoginError() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-8 text-center">
      <H1>Something went wrong!</H1>
      <Alert className="text-accent-foreground max-w-prose text-left">
        <KeyRound className="size-4" />
        <AlertTitle>{"Sorry we couldn't log you in."}</AlertTitle>
        <AlertDescription>
          {
            "Please go back and try again! If the problem persists, please contact us at waylandstudentathlete@gmail.com."
          }
        </AlertDescription>
      </Alert>
      <Link href={"/login"}>
        <Button>Back to login</Button>
      </Link>
    </main>
  );
}
