import { Separator } from "@components/ui/separator";

export function ReviewsListSkeleton() {
  return (
    <>
      <Separator className="mt-6" />
      {/* Skeleton for 3 review sections */}
      {[0, 1, 2].map((idx) => (
        <div
          key={idx}
          className={`w-full py-12 ${
            idx % 3 === 0
              ? "bg-background"
              : idx % 3 === 1
                ? "bg-accent"
                : "bg-cream"
          }`}
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 md:flex-row">
            <div className="bg-muted h-64 w-full animate-pulse rounded-lg md:w-1/2" />
            <div className="flex w-full flex-col gap-4 md:w-1/2">
              <div className="bg-muted h-6 w-3/4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-full animate-pulse rounded" />
              <div className="bg-muted h-4 w-full animate-pulse rounded" />
              <div className="bg-muted h-4 w-2/3 animate-pulse rounded" />
              <div className="bg-muted mt-4 h-5 w-1/3 animate-pulse rounded" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
