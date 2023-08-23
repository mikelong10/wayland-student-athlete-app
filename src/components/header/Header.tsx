import { getCurrentUser } from "@lib/session";
import { ActiveUser, HeaderNavLink } from "@lib/types";

import HeaderContent from "./HeaderContent";

export interface NavProps {
  user?: ActiveUser;
  headerNavLinks: HeaderNavLink[];
}

export default async function Header() {
  const user = await getCurrentUser();

  return <HeaderContent user={user} />;
}
