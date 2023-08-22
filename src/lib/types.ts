import { buttonVariants } from "@components/ui/button";
import { VariantProps } from "class-variance-authority";

export type ActiveUser = {
  id?: number | undefined;
  email?: string | null | undefined;
  name?: string | null | undefined;
  image?: string | null | undefined;
}

export interface HeaderNavLink extends VariantProps<typeof buttonVariants> {
  url: string;
  text: string;
  mobileStyle?: string;
  desktopStyle?: string;
}