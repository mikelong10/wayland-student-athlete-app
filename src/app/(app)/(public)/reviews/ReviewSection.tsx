import Image from "next/image";
import { Image as ReviewImage } from "@prisma/client";
import { Quote } from "lucide-react";

import { cn } from "@lib/utils";
import Carousel from "@components/Carousel";
import Container from "@components/Container";
import { Card } from "@components/ui/card";

function ReviewSection({
  images,
  reviewText,
  reviewerName,
  variant,
  bgColor,
}: {
  images: ReviewImage[];
  reviewText: string;
  reviewerName: string;
  variant: "left" | "right";
  bgColor: string;
}) {
  if (images.length > 1) {
    const carouselItems = images.map((img) => ({
      key: img.id,
      content: (
        <div className="flex max-h-[520px] items-center overflow-hidden">
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            style={{ objectFit: "contain" }}
          />
        </div>
      ),
    }));

    return (
      <Container className={cn("flex w-full justify-center", bgColor)}>
        <Carousel
          header={<Quote className="text-secondary h-10 w-10" />}
          items={carouselItems}
          footer={
            <div className="flex w-full flex-col gap-2">
              <blockquote className="border-tertiary whitespace-normal border-l-2 pl-3 leading-6 md:text-lg md:leading-8">
                {`"${reviewText}"`}
              </blockquote>
              <p className="text-muted-foreground text-xs italic md:text-sm">
                {`- ${reviewerName}`}
              </p>
            </div>
          }
          className="my-16"
        />
      </Container>
    );
  } else if (images.length === 1) {
    const img = images[0];
    if (variant === "left") {
      return (
        <Container className={bgColor}>
          <section className="flex w-full flex-col items-center gap-8 py-16 lg:flex-row lg:gap-12 xl:gap-16">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="rounded-lg lg:w-1/2"
            />
            <div className="flex w-full flex-col gap-2 lg:w-1/2">
              <blockquote className="border-tertiary whitespace-normal border-l-2 pl-3 leading-6 md:text-lg md:leading-8">
                {`"${reviewText}"`}
              </blockquote>
              <p className="text-muted-foreground text-xs italic md:text-sm">
                {`- ${reviewerName}`}
              </p>
            </div>
          </section>
        </Container>
      );
    } else {
      return (
        <Container className={bgColor}>
          <section className="flex w-full flex-col items-center gap-8 py-16 lg:flex-row lg:gap-12 xl:gap-16">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="rounded-lg lg:hidden lg:w-1/2"
            />
            <div className="flex w-full flex-col gap-2 lg:w-1/2">
              <blockquote className="border-tertiary whitespace-normal border-l-2 pl-3 leading-6 md:text-lg md:leading-8">
                {`"${reviewText}"`}
              </blockquote>
              <p className="text-muted-foreground text-xs italic md:text-sm">
                {`- ${reviewerName}`}
              </p>
            </div>
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="hidden rounded-lg lg:block lg:w-1/2"
            />
          </section>
        </Container>
      );
    }
  } else {
    return (
      <Container className={cn("py-16", bgColor)}>
        <Card className="flex w-full flex-col gap-4 p-8">
          <Quote className="text-secondary h-10 w-10" />
          <div className="flex w-full flex-col gap-2">
            <blockquote className="border-tertiary whitespace-normal border-l-2 pl-3 leading-6 md:text-lg md:leading-8">
              {`"${reviewText}"`}
            </blockquote>
            <p className="text-muted-foreground text-xs italic md:text-sm">
              {`- ${reviewerName}`}
            </p>
          </div>
        </Card>
      </Container>
    );
  }
}

export default ReviewSection;
