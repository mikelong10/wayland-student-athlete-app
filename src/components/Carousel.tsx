"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";
import { Progress } from "@components/ui/progress";

export default function Carousel({
  header,
  items,
  footer,
}: {
  header: JSX.Element;
  items: JSX.Element[];
  footer: JSX.Element;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const updateIndex = (newIndex: number) => {
    // wrap around indices
    console.log("newIndex", newIndex);
    if (newIndex < 0) {
      newIndex = items.length - 1;
    } else if (newIndex >= items.length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  const carouselItems = items.map((item) => (
    <div key={item.key} className="inline-flex w-full">
      {item}
    </div>
  ));

  return (
    <Card className="flex w-full max-w-3xl flex-col gap-6 overflow-hidden">
      <CardHeader>{header}</CardHeader>
      <CardContent className={"overflow-hidden"}>
        <div
          style={{ transform: `translate(-${activeIndex * 100}%)` }}
          className={"whitespace-nowrap transition-all"}
        >
          {carouselItems}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-8">
        <div className="flex w-full flex-col gap-4">
          <Progress
            value={((activeIndex + 1) * 100) / items.length}
            className="h-1"
          />
          <div className="flex items-center gap-8">
            <div className="flex gap-4">
              <ChevronLeft
                strokeWidth={1}
                className="border-primary text-primary hover:bg-primary rounded-full border-2 p-1 transition-colors hover:cursor-pointer hover:text-white"
                width={48}
                height={48}
                onClick={() => updateIndex(activeIndex - 1)}
              />
              <ChevronRight
                strokeWidth={1}
                className="border-primary text-primary hover:bg-primary rounded-full border-2 p-1 transition-colors hover:cursor-pointer hover:text-white"
                width={48}
                height={48}
                onClick={() => updateIndex(activeIndex + 1)}
              />
            </div>
            <div className="flex gap-2">
              <p className="text-muted-foreground text-sm">
                <span className="text-primary">{`0${activeIndex + 1}`}</span>
                {` / 0${items.length}`}
              </p>
            </div>
          </div>
        </div>
        {footer}
      </CardFooter>
    </Card>
  );
}
