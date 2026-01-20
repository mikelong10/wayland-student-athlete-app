"use client";

import { Button, type ButtonProps } from "@components/ui/button";
import { scrollToElement } from "@lib/utils";

interface InteractiveButtonProps extends ButtonProps {
  children?: React.ReactNode;
  idScrollToElement?: string;
}

export default function InteractiveButton({
  className,
  variant = "default",
  size,
  asChild = false,
  idScrollToElement,
  children,
  ...props
}: InteractiveButtonProps) {
  if (idScrollToElement)
    return (
      <Button
        className={className}
        variant={variant}
        size={size}
        asChild={asChild}
        onClick={() => scrollToElement(idScrollToElement)}
        {...props}
      >
        {children}
      </Button>
    );

  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      asChild={asChild}
      {...props}
    >
      {children}
    </Button>
  );
}
