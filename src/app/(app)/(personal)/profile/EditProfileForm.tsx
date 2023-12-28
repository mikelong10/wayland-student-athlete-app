"use client";

import { useState } from "react";
import { User } from "@prisma/client";

import { UploadButton } from "@lib/uploadthing";
import { useToast } from "@components/ui/use-toast";
import { UserAvatar } from "@components/UserAvatar";
import EditUserNameForm from "./EditUserNameForm";
import EditUserPhoneForm from "./EditUserPhoneForm";

export default function EditProfileForm({ user }: { user: User }) {
  const { toast } = useToast();
  const [activeUser, setActiveUser] = useState<User>(user);

  return (
    <div className="xs:flex-row xs:items-center my-4 flex w-full flex-col gap-16">
      <div className="flex flex-col items-center">
        <UploadButton
          endpoint="profilePicture"
          onClientUploadComplete={(res) => {
            setActiveUser((prev) => ({ ...prev, image: res[0].url }));
          }}
          onUploadError={(error: Error) => {
            toast({
              title: "Uh oh! Something went wrong.",
              description: `${error.message}. Please try again.`,
              variant: "destructive",
            });
          }}
          content={{
            button() {
              return (
                <UserAvatar
                  user={{
                    image: activeUser.image,
                    name: activeUser.name,
                  }}
                  className="h-40 w-40"
                />
              );
            },
            allowedContent({ isUploading }) {
              if (isUploading) return <p>Uploading...</p>;
              return <p>Choose image</p>;
            },
          }}
          className="ut-button:rounded-full ut-button:w-fit ut-button:h-fit ut-button:mb-1 ut-button:bg-accent ut-button:text-accent-foreground ut-button:hover:opacity-70 ut-button:transition-all ut-button:focus-within:ring-ring ut-button:after:bg-primary ut-allowed-content:text-sm ut-upload-icon:bg-accent h-full w-full"
        />
      </div>
      <div className="flex flex-col gap-4">
        <EditUserNameForm user={activeUser} />
        <EditUserPhoneForm user={activeUser} />
      </div>
    </div>
  );
}
