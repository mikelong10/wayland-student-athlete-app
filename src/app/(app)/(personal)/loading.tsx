import { Loader2 } from "lucide-react";

import { Footer } from "@components/footer/Footer";
import Header from "@components/header/Header";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Header />
      <div className="bg-background flex h-full min-h-screen w-full flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
      <Footer />
    </div>
  );
}
