import { User } from "@prisma/client";

import { getCurrentUser } from "@lib/session";
import { HeaderNavLink } from "@lib/types";
import HeaderContent from "./HeaderContent";

export interface NavProps {
  user?: User;
  headerNavLinks: HeaderNavLink[];
}

export default async function Header() {
  const user = await getCurrentUser();

  return <HeaderContent user={user} />;
}
