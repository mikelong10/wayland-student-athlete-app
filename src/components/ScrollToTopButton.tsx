"use client";

import { Button } from "@components/ui/button";
import { scrollToTop } from "@lib/utils";
import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  const shouldShow = useCallback(() => {
    setShow(window.scrollY > 1000);
  }, []);

  useEffect(() => {
    shouldShow();
    window.addEventListener("scroll", shouldShow);
    return () => {
      window.removeEventListener("scroll", shouldShow);
    };
  }, [shouldShow]);

  return (
    <Button
      variant={"traced"}
      size={"icon"}
      className={`fixed bottom-0 right-0 m-2 ${!show ? "hidden" : ""}`}
      onClick={scrollToTop}
    >
      <ArrowUp />
    </Button>
  );
}
