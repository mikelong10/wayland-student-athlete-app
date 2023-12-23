"use client";

import { User } from "@prisma/client";

import { UserAvatar } from "@components/UserAvatar";
import EditUserNameForm from "./EditUserNameForm";
import EditUserPhoneForm from "./EditUserPhoneForm";

export default function EditProfileForm({ user }: { user: User }) {
  return (
    <div className="xs:flex-row my-8 flex w-full flex-col gap-8">
      <UserAvatar
        user={{
          image: user.image,
          name: user.name,
        }}
        className="h-24 w-24"
      />
      <div className="flex flex-col gap-4">
        <EditUserNameForm user={user} />
        <EditUserPhoneForm user={user} />
      </div>
    </div>
  );
}
