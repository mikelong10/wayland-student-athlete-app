"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { scrollToTop } from "@lib/utils";
import { Button } from "@components/ui/button";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  const shouldShow = () => {
    setShow(window.scrollY > 1000);
  };

  useEffect(() => {
    shouldShow();
    window.addEventListener("scroll", shouldShow);
    return () => {
      window.removeEventListener("scroll", shouldShow);
    };
  }, []);

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
