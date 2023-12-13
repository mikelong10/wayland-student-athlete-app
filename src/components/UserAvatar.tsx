import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

interface UserAvatarProps extends AvatarProps {
  user: { image?: string | null; name?: string | null };
  fallbackIconSize?: number;
}

export function UserAvatar({
  user,
  fallbackIconSize = 6,
  ...props
}: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage alt="Picture" src={user.image ?? undefined} />
      <AvatarFallback>
        <span className="sr-only">{user.name}</span>
        <User className={`h-${fallbackIconSize} w-${fallbackIconSize}`} />
      </AvatarFallback>
    </Avatar>
  );
}
