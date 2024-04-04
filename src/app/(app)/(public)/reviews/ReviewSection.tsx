import Image from "next/image";
import { JobReviewImage, User } from "@db/types";
import {
  MessageSquareHeart,
  MessageSquareMore,
  MessageSquareQuote,
  MessageSquareText,
} from "lucide-react";

import { Role } from "@lib/enums";
import { cn } from "@lib/utils";
import Carousel from "@components/Carousel";
import Container from "@components/Container";
import H2 from "@components/typography/h2";
import { Card } from "@components/ui/card";
import AdminManageReviewActions from "./AdminManageReviewActions";

export default function ReviewSection({
  user,
  reviewId,
  images,
  reviewBlurb,
  reviewText,
  reviewerName,
  variant,
  bgColor,
}: {
  user: User | undefined;
  reviewId: string;
  images: JobReviewImage[];
  reviewBlurb: string;
  reviewText: string;
  reviewerName: string;
  variant: "left" | "right";
  bgColor: string;
}) {
  if (images.length > 1) {
    const carouselItems = images.map((img) => ({
      key: img.id,
      content: (
        <div className="flex max-h-[480px] items-center overflow-hidden">
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority={true}
          />
        </div>
      ),
    }));

    return (
      <Container
        className={cn(
          "flex w-full flex-col items-center justify-center py-16",
          bgColor
        )}
      >
        <Carousel
          header={
            <div className="flex items-center gap-4">
              <MessageSquareHeart className="text-secondary size-10" />
              <H2>{reviewBlurb}</H2>
            </div>
          }
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
        />
        {user?.role === Role.ADMIN && (
          <AdminManageReviewActions
            reviewId={reviewId}
            reviewerName={reviewerName}
          />
        )}
      </Container>
    );
  } else if (images.length === 1) {
    const img = images[0];
    if (variant === "left") {
      return (
        <Container
          className={cn(
            "flex w-full flex-col items-center justify-center py-16",
            bgColor
          )}
        >
          <section className="flex w-full max-w-6xl flex-col items-center justify-center gap-12 lg:flex-row lg:gap-16 xl:gap-20">
            <div className="w-fit lg:flex lg:w-1/2 lg:justify-center">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                style={{ objectFit: "contain" }}
                className="max-h-[480px] w-fit rounded-md"
              />
            </div>
            <div className="flex w-full flex-col gap-6 lg:w-1/2">
              <div className="flex items-center gap-4">
                <MessageSquareMore className="text-secondary size-10" />
                <H2>{reviewBlurb}</H2>
              </div>
              <div className="flex flex-col gap-2">
                <blockquote className="border-tertiary whitespace-normal border-l-2 pl-3 leading-6 md:text-lg md:leading-8">
                  {`"${reviewText}"`}
                </blockquote>
                <p className="text-muted-foreground text-xs italic md:text-sm">
                  {`- ${reviewerName}`}
                </p>
              </div>
            </div>
          </section>
          {user?.role === Role.ADMIN && (
            <AdminManageReviewActions
              reviewId={reviewId}
              reviewerName={reviewerName}
            />
          )}
        </Container>
      );
    } else {
      return (
        <Container
          className={cn(
            "flex w-full flex-col items-center justify-center py-16",
            bgColor
          )}
        >
          <section className="flex w-full max-w-6xl flex-col items-center justify-center gap-12 lg:flex-row lg:gap-16 xl:gap-20">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              style={{ objectFit: "contain" }}
              className="max-h-[480px] w-fit rounded-md lg:hidden"
            />
            <div className="flex w-full flex-col gap-6 lg:w-1/2">
              <div className="flex items-center gap-4">
                <MessageSquareText className="text-secondary size-10" />
                <H2>{reviewBlurb}</H2>
              </div>
              <div className="flex flex-col gap-2">
                <blockquote className="border-tertiary whitespace-normal border-l-2 pl-3 leading-6 md:text-lg md:leading-8">
                  {`"${reviewText}"`}
                </blockquote>
                <p className="text-muted-foreground text-xs italic md:text-sm">
                  {`- ${reviewerName}`}
                </p>
              </div>
            </div>
            <div className="hidden w-fit lg:flex lg:w-1/2 lg:justify-center">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                style={{ objectFit: "contain" }}
                className="max-h-[480px] w-fit rounded-md"
              />
            </div>
          </section>
          {user?.role === Role.ADMIN && (
            <AdminManageReviewActions
              reviewId={reviewId}
              reviewerName={reviewerName}
            />
          )}
        </Container>
      );
    }
  } else {
    return (
      <Container className={cn("flex justify-center py-16", bgColor)}>
        <Card className="flex w-full max-w-4xl flex-col gap-4 p-8">
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-center gap-4">
              <MessageSquareQuote className="text-secondary size-10" />
              <H2>{reviewBlurb}</H2>
            </div>
            <div className="flex flex-col gap-2">
              <blockquote className="border-tertiary whitespace-normal border-l-2 pl-3 leading-6 md:text-lg md:leading-8">
                {`"${reviewText}"`}
              </blockquote>
              <p className="text-muted-foreground text-xs italic md:text-sm">
                {`- ${reviewerName}`}
              </p>
            </div>
          </div>
        </Card>
      </Container>
    );
  }
}
