import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-background flex h-full min-h-screen w-full flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
}
