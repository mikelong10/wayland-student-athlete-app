import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 h-6 text-sm font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary hover:bg-primary/70 text-primary-foreground",
        secondary:
          "border-transparent bg-secondary hover:bg-secondary/70 text-secondary-foreground",
        accent:
          "border-transparent bg-accent hover:bg-accent/70 text-accent-foreground",
        destructive:
          "border-transparent bg-destructive hover:bg-destructive/70 text-destructive-foreground",
        outline: "text-foreground",
        TODO: "border-transparent bg-red-50 dark:bg-red-950",
        INPROGRESS: "border-transparent bg-yellow-50 dark:bg-yellow-950",
        DONE: "border-transparent bg-green-50 dark:bg-green-950",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
