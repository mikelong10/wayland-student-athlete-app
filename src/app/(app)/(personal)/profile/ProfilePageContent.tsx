"use client";

import Link from "next/link";
import { User } from "@prisma/client";
import { MoveRight } from "lucide-react";

import Container from "@components/Container";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import EditProfileForm from "./EditProfileForm";

export default function ProfilePageContent({ user }: { user: User }) {
  return (
    <Container className="flex h-full min-h-screen w-full flex-col justify-center gap-4 py-20 sm:max-w-[768px] lg:max-w-[960px]">
      <h1 className="w-full scroll-m-20 text-left text-4xl font-extrabold tracking-tight">
        Profile
      </h1>
      <Separator />
      <EditProfileForm user={user} />
      <Link href="/jobs">
        <Button variant={"accent"} className="flex items-center gap-2">
          My jobs
          <MoveRight />
        </Button>
      </Link>
    </Container>
  );
}
