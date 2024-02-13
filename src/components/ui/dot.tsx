import { Status } from "@prisma/client";

import { cn } from "@lib/utils";

interface DotProps extends React.HTMLAttributes<HTMLDivElement> {
  status: Status;
}

export default function Dot({ status, className }: DotProps) {
  return (
    <div
      className={cn(
        `size-2 rounded-full ${
          status === Status.TODO
            ? " bg-red-500"
            : status === Status.INPROGRESS
              ? "bg-yellow-500"
              : "bg-green-500"
        }`,
        className
      )}
    />
  );
}
