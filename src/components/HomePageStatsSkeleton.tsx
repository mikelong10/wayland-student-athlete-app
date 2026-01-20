export function HomePageStatsSkeleton() {
  return (
    <div className="mt-8 flex w-full flex-col justify-center gap-8 sm:flex-row sm:gap-8 md:gap-16 lg:gap-24">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="bg-muted xs:h-16 xs:w-32 h-14 w-28 animate-pulse rounded-md sm:h-16 sm:w-32" />
        <p className="text-accent-foreground text-lg font-semibold underline underline-offset-8">
          Jobs requested and completed
        </p>
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="bg-muted xs:h-16 xs:w-32 h-14 w-28 animate-pulse rounded-md sm:h-16 sm:w-32" />
        <p className="text-accent-foreground text-lg font-semibold underline underline-offset-8">
          Parents, kids, and families served
        </p>
      </div>
    </div>
  );
}
