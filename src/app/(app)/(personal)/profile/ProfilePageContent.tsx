"use client";

import Link from "next/link";
import { User } from "@db/types";
import { MoveRight } from "lucide-react";

import Container from "@components/Container";
import H1 from "@components/typography/h1";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import EditProfileForm from "./EditProfileForm";

export default function ProfilePageContent({ user }: { user: User }) {
  return (
    <Container className="flex size-full min-h-screen flex-col items-center justify-center gap-4 pb-20 pt-32">
      <div className="sm:max-w-screen-sm, flex w-full flex-col justify-center gap-4 lg:max-w-screen-md">
        <H1 className="w-full scroll-m-20 text-left">Profile</H1>
        <Separator />
        <EditProfileForm user={user} />
        <Separator />
        <Button
          asChild
          variant={"secondary"}
          className="flex w-fit items-center gap-2"
        >
          <Link href="/jobs">
            My jobs
            <MoveRight />
          </Link>
        </Button>
      </div>
    </Container>
  );
}
