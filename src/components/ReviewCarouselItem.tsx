import { ReviewCarouselItemInfo } from "@components/ReviewCarousel";

export default function ReviewCarouselItem({
  review,
}: {
  review: ReviewCarouselItemInfo;
}) {
  return (
    <div className="flex flex-col gap-2">
      <blockquote className="border-secondary whitespace-normal border-l-2 pl-3">
        {review.quote}
      </blockquote>
      <p className="text-muted-foreground text-xs italic">
        - {review.reviewer}
      </p>
    </div>
  );
}
