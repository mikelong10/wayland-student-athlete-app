export function StudentAthleteGridSkeleton() {
  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="bg-muted h-[256px] w-full animate-pulse rounded-md sm:h-[256px] md:h-[304px] lg:h-[256px] xl:h-[320px] 2xl:h-[262px]" />
            <div className="flex flex-col items-center gap-2">
              <div className="bg-muted h-6 w-32 animate-pulse rounded" />
              <div className="bg-muted h-5 w-24 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
