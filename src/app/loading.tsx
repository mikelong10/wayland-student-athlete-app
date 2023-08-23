import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen h-full w-full flex flex-col justify-center items-center bg-background">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
}
