"use client";

import { cn } from "@lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-80",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-80",
        outline:
          "text-primary border border-primary bg-background hover:bg-primary hover:text-primary-foreground",
        traced:
          "text-foreground border border-border bg-background hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-80",
        tertiary: "bg-tertiary text-tertiary-foreground hover:opacity-80",
        accent: "bg-accent text-accent-foreground hover:opacity-80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
        underline:
          "underline underline-offset-4 hover:no-underline transition-all hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:hover:opacity-80 data-[state=open]:hover:opacity-80",
        none: "",
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-10 rounded-md px-3",
        lg: "h-14 rounded-md px-8",
        smIcon: "h-10 w-10",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
