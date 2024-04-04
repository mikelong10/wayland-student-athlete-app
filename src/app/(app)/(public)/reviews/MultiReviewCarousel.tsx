"use client";

import Image from "next/image";
import { JobReviewWithImages, User } from "@db/types";
import { Quote } from "lucide-react";

import { Role } from "@lib/enums";
import { cn } from "@lib/utils";
import Container from "@components/Container";
import H2 from "@components/typography/h2";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import AdminManageReviewActions from "./AdminManageReviewActions";

export default function MultiReviewCarousel({
  user,
  jobReviews,
  bgColor,
}: {
  user: User | undefined;
  jobReviews: JobReviewWithImages[];
  bgColor: string;
}) {
  return (
    <Container
      className={cn(
        "bg-accent flex w-full flex-col items-center justify-center gap-6 pb-24 pt-16 sm:px-20 md:px-24 lg:px-28 xl:px-32",
        bgColor
      )}
    >
      <div className="flex items-center gap-4">
        <Quote className="text-secondary size-10" />
        <H2>{jobReviews[0].review.reviewBlurb}</H2>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-prose lg:max-w-5xl"
      >
        <CarouselContent>
          {jobReviews.map((jobReview) => (
            <CarouselItem
              key={jobReview.review.id}
              className="flex flex-col items-center lg:basis-1/2"
            >
              <div className="p-1">
                <Card className="flex flex-col gap-6">
                  {jobReview.images.length > 0 && (
                    <CardContent className="flex items-center justify-center">
                      <Image
                        src={jobReview.images[0].src}
                        alt={jobReview.images[0].alt}
                        width={jobReview.images[0].width}
                        height={jobReview.images[0].height}
                        style={{ objectFit: "contain" }}
                        priority={true}
                        className="max-h-[480px]"
                      />
                    </CardContent>
                  )}
                  <CardFooter>
                    <div className="flex flex-col gap-2">
                      <blockquote className="border-tertiary whitespace-normal border-l-2 pl-3 leading-6 md:text-lg md:leading-8">
                        {`"${jobReview.review.reviewText}"`}
                      </blockquote>
                      <p className="text-muted-foreground text-xs italic md:text-sm">
                        {`- ${jobReview.review.reviewerName}`}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </div>
              {user?.role === Role.ADMIN && (
                <AdminManageReviewActions
                  reviewId={jobReview.review.id}
                  reviewerName={jobReview.review.reviewerName}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Container>
  );
}
