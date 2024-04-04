import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Status } from "@lib/enums";
import { cn } from "@lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 h-6 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary hover:opacity-80 text-primary-foreground",
        secondary:
          "border-transparent bg-secondary hover:opacity-80 text-secondary-foreground",
        tertiary:
          "border-transparent bg-tertiary hover:opacity-80 text-tertiary-foreground",
        accent:
          "border-transparent bg-accent hover:opacity-80 text-accent-foreground",
        muted:
          "border-transparent bg-muted hover:opacity-80 text-muted-foreground",
        destructive:
          "border-transparent bg-destructive hover:opacity-80 text-destructive-foreground",
        outline: "text-foreground",
        [Status.TODO]: "border-transparent bg-red-50 dark:bg-red-950",
        [Status.IN_PROGRESS]:
          "border-transparent bg-yellow-50 dark:bg-yellow-950",
        [Status.DONE]: "border-transparent bg-green-50 dark:bg-green-950",
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
