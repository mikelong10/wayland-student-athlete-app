import Link from "next/link";
import { Quote } from "lucide-react";

import { generateUniqueId } from "@lib/utils";
import Carousel from "@components/Carousel";
import ReviewCarouselItem from "@components/ReviewCarouselItem";
import { Button } from "@components/ui/button";

export type ReviewCarouselItemInfo = {
  quote: string;
  reviewer: string;
};

const reviewCarouselItems: ReviewCarouselItemInfo[] = [
  {
    quote:
      "The team that came to our house was terrific! They worked quickly, efficiently and safely while clearing out our attic. I have no hesitation using them again and recommending them to anybody in the community!",
    reviewer: "Mark Yurkofsky",
  },
  {
    quote:
      "You worked hard and efficiently. What took you two hours would have taken us much longer, not to mention it saved our aging backs! The communication while setting the job was excellent. You were also punctual, polite, caring, and friendly. I will not hesitate to use them again and recommend them to anyone!",
    reviewer: "Sylvia Diaz",
  },
  {
    quote:
      "All in all, I recommend Wayland Student Athlete highly. Good communication, hard workers, and thorough.",
    reviewer: "Connie Burgess",
  },
  {
    quote:
      "They both did beautiful work with the utmost professionalism. Their work was definitely on par with a professional company! They were also considerably lower in price than other quotes I received. I hope other Wayland families will give these young men a try—they are great!",
    reviewer: "Jane Horne",
  },
  {
    quote:
      "Thank you, Wayland Student-Athlete for building our new trampoline!!! We appreciate your hard work to make our new home fun and safe!!!! We have many more projects in store for you all!",
    reviewer: "Jennifer Kaplan",
  },
];
const reviewCarouselComponents = reviewCarouselItems.map((item) => ({
  key: generateUniqueId(item.quote),
  content: <ReviewCarouselItem review={item} />,
}));

export default function ReviewCarousel() {
  return (
    <Carousel
      header={<Quote className="text-secondary h-10 w-10" />}
      items={reviewCarouselComponents}
      footer={
        <Link href="/reviews" className="w-full">
          <Button variant={"secondary"} className="w-full">
            Read more reviews
          </Button>
        </Link>
      }
    />
  );
}
