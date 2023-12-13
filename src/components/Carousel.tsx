"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { Button } from "@components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";
import { Progress } from "@components/ui/progress";

export default function Carousel() {
  const items = [
    {
      quote:
        "All in all, I recommend Wayland Student Athlete highly. Good communication, hard workers, and thorough.",
      reviewer: "Connie Burgess",
    },
    {
      quote: "The team that came to our house was terrific! They worked quickly, efficiently and safely while clearing out our attic. I have no hesitation using them again and recommending them to anybody in the community!",
      reviewer: "Mark Yurkofsky",
    },
    {
      quote: "You worked hard and efficiently. What took you two hours would have taken us much longer, not to mention it saved our aging backs! The communication while setting the job was excellent. You were also punctual, polite, caring, and friendly. I will not hesitate to use them again and recommend them to anyone!",
      reviewer: "Sylvia Diaz",
    },
  ];

  const [progress, setProgress] = useState(0);
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

  console.log("activeIndex", activeIndex);
  console.log(`translate-x-[-${activeIndex * 100}%]`);

  return (
    <Card className="border-none shadow-lg flex flex-col gap-6 max-w-3xl overflow-hidden">
      <CardHeader>
        <Quote />
      </CardHeader>
      <CardContent className={"overflow-hidden"}>
        <div
          style={{ transform: `translate(-${activeIndex * 100}%)` }}
          className={"whitespace-nowrap transition-all"}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full inline-flex">
              <div className="flex flex-col gap-2">
                <blockquote className="border-l-2 border-secondary pl-3 whitespace-normal">
                  {item.quote}
                </blockquote>
                <p className="text-muted-foreground text-xs italic">
                  - {item.reviewer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 w-full">
          <Progress
            value={((activeIndex + 1) * 100) / items.length}
            className="h-1"
          />
          <div className="flex items-center gap-8">
            <div className="flex gap-4">
              <ChevronLeft
                strokeWidth={1}
                className="border-2 border-primary text-primary p-1 rounded-full hover:cursor-pointer hover:bg-primary hover:text-white transition-colors"
                width={48}
                height={48}
                onClick={() => updateIndex(activeIndex - 1)}
              />
              <ChevronRight
                strokeWidth={1}
                className="border-2 border-primary text-primary p-1 rounded-full hover:cursor-pointer hover:bg-primary hover:text-white transition-colors"
                width={48}
                height={48}
                onClick={() => updateIndex(activeIndex + 1)}
              />
            </div>
            <div className="flex gap-2">
              <p className="text-sm text-muted-foreground">
                <span className="text-primary">{`0${activeIndex + 1}`}</span>
                {` / 0${items.length}`}
              </p>
            </div>
          </div>
        </div>
        <Link href="/reviews" className="w-full">
          <Button variant={"default"} className="w-full">
            Read more reviews
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );

  return (
    <Card className="border-none shadow-lg flex flex-col gap-6 max-w-4xl overflow-hidden">
      <CardHeader>
        <Quote />
      </CardHeader>
      <CardContent className="-mx-[24px] flex w-[calc(100%+48px)] snap-x snap-mandatory overflow-x-auto md:-mx-[48px] md:w-[calc(100%+96px)]  xl:-mx-[96px] xl:w-[calc(100%+192px)]">
        <div className="w-full flex-shrink-0 snap-start snap-always flex flex-col gap-2 px-6 md:px-12 xl:px-24">
          <blockquote className="border-l-2 border-secondary pl-3">
            “All in all, I recommend Wayland Student Athlete highly. Good
            communication, hard workers, and thorough.”
          </blockquote>
          <p className="text-muted-foreground text-xs italic">
            - Connie Burgess
          </p>
        </div>
        <div className="w-full flex-shrink-0 snap-start snap-always flex flex-col gap-2 px-6 md:px-12 xl:px-24">
          <blockquote className="border-l-2 border-secondary pl-3">
            “All in all, I recommend Wayland Student Athlete highly. Good
            communication, hard workers, and thorough.”
          </blockquote>
          <p className="text-muted-foreground text-xs italic">
            - Connie Burgess
          </p>
        </div>
        <div className="w-full flex-shrink-0 snap-start snap-always flex flex-col gap-2 px-6 md:px-12 xl:px-24">
          <blockquote className="border-l-2 border-secondary pl-3">
            “All in all, I recommend Wayland Student Athlete highly. Good
            communication, hard workers, and thorough.”
          </blockquote>
          <p className="text-muted-foreground text-xs italic">
            - Connie Burgess
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 w-full">
          <Progress value={progress} className="h-1" />
          <div className="flex gap-4">
            <ChevronLeft
              strokeWidth={1}
              className="bg-primary text-white p-1 rounded-full hover:cursor-pointer hover:bg-primary/70 transition-colors"
              width={48}
              height={48}
              onClick={() => setProgress(progress - 10)}
            />
            <ChevronRight
              strokeWidth={1}
              className="bg-primary text-white p-1 rounded-full hover:cursor-pointer hover:bg-primary/70 transition-colors"
              width={48}
              height={48}
              onClick={() => setProgress(progress + 10)}
            />
          </div>
        </div>
        <Link href="/reviews" className="w-full">
          <Button variant={"default"} className="w-full">
            Read more reviews
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
