"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";
import { Progress } from "@components/ui/progress";

import { cn } from "@lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type JSX } from "react";

type CarouselItem = {
  key: string;
  content: JSX.Element;
};

export default function Carousel({
  header,
  items,
  footer,
  className,
}: {
  header?: JSX.Element;
  items: CarouselItem[];
  footer?: JSX.Element;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const updateIndex = (newIndex: number) => {
    // wrap around indices
    if (newIndex < 0) {
      newIndex = items.length - 1;
    } else if (newIndex >= items.length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  const carouselItems = items.map((item) => (
    <div key={item.key} className="inline-flex w-full">
      {item.content}
    </div>
  ));

  return (
    <Card
      className={cn(
        "flex w-full max-w-3xl flex-col gap-6 overflow-hidden",
        className
      )}
    >
      {!!header && <CardHeader>{header}</CardHeader>}
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
                className="bg-primary rounded-full border-2 border-none p-1 text-white transition-all hover:cursor-pointer hover:opacity-80"
                width={48}
                height={48}
                onClick={() => updateIndex(activeIndex - 1)}
              />
              <ChevronRight
                strokeWidth={1}
                className="bg-primary rounded-full border-2 border-none p-1 text-white transition-all hover:cursor-pointer hover:opacity-80"
                width={48}
                height={48}
                onClick={() => updateIndex(activeIndex + 1)}
              />
            </div>
            <div className="flex gap-2">
              <p className="select-none text-sm">
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
