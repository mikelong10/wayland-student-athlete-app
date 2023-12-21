import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils";

const h1Variants = cva(
  "scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
);

const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof h1Variants>
>(({ className, ...props }, ref) => (
  <h1 ref={ref} className={cn(h1Variants(), className)} {...props} />
));
H1.displayName = "H1";

export default H1;
