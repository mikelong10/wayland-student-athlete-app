import { rubik } from "@lib/fonts";
import { cn } from "@lib/utils";
import * as React from "react";

const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl",
      rubik.className,
      className
    )}
    {...props}
  />
));
H1.displayName = "H1";

export default H1;
