"use client";

import { Button, ButtonProps } from "@components/ui/button";

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
