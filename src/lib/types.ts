import { VariantProps } from "class-variance-authority";
import { z } from "zod";

import { buttonVariants } from "@components/ui/button";

export type ActiveUser = {
  id?: string | undefined;
  email?: string | null | undefined;
  name?: string | null | undefined;
  image?: string | null | undefined;
};

export interface HeaderNavLink extends VariantProps<typeof buttonVariants> {
  url: string;
  text: string;
  mobileStyle?: string;
  desktopStyle?: string;
}

export const requestJobFormSchema = z.object({
  adultFirstName: z.string().nonempty("Required"),
  adultLastName: z.string().nonempty("Required"),
  childFirstName: z.string().optional(),
  childLastName: z.string().optional(),
  description: z.string().nonempty("Required"),
  location: z.string().nonempty("Required"),
  time: z.string().nonempty("Required"),
  contact: z.string().nonempty("Required"),
  learn: z.string().nonempty("Required"),
  special: z.string().optional(),
  signature: z.string().nonempty("Required"),
});
