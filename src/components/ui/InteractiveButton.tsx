"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";

import { Button, ButtonProps, buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";

interface InteractiveButtonProps extends ButtonProps {
  children?: React.ReactNode;
  idScrollToElement?: string;
  sheetCloseButton?: boolean;
}

export default function InteractiveButton({
  className,
  variant = "default",
  size,
  asChild = false,
  idScrollToElement,
  sheetCloseButton,
  children,
  ...props
}: InteractiveButtonProps) {
  function scrollToElement(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
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

  if (sheetCloseButton) {
    return (
      <SheetPrimitive.Close
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </SheetPrimitive.Close>
    );
  }

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
