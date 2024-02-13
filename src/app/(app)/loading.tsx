import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-background flex size-full min-h-screen flex-col items-center justify-center">
      <Loader2 className="size-10 animate-spin" />
    </div>
  );
}
