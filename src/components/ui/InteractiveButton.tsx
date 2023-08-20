"use client";

import { Button, ButtonProps } from "@components/ui/button";

interface InteractiveButtonProps extends ButtonProps {
  idScrollToElement?: string;
}

export default function InteractiveButton({
  className,
  variant,
  size,
  asChild = false,
  idScrollToElement,
  ...props
}: InteractiveButtonProps) {
  function scrollToElement(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  return idScrollToElement ? (
    <Button
      className={className}
      variant={variant}
      size={size}
      asChild={asChild}
      onClick={() => scrollToElement(idScrollToElement)}
      {...props}
    />
  ) : (
    <Button
      className={className}
      variant={variant}
      size={size}
      asChild={asChild}
      {...props}
    />
  );
}
