export function AdminUserTabsSkeleton() {
  return (
    <div className="w-full">
      <div className="bg-muted mb-4 flex w-full gap-1 rounded-lg p-1">
        <div className="bg-background h-9 flex-1 animate-pulse rounded-md" />
        <div className="bg-muted h-9 flex-1 rounded-md" />
        <div className="bg-muted h-9 flex-1 rounded-md" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-card flex flex-col gap-4 rounded-lg border p-4"
          >
            <div className="flex items-center gap-4">
              <div className="bg-muted size-12 animate-pulse rounded-full" />
              <div className="flex flex-col gap-2">
                <div className="bg-muted h-5 w-32 animate-pulse rounded" />
                <div className="bg-muted h-4 w-48 animate-pulse rounded" />
              </div>
            </div>
            <div className="bg-muted h-8 w-24 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
