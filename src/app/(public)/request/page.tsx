import { Separator } from "@components/ui/separator";
import RequestJobForm from "./RequestJobForm";

export const metadata = {
  title: "Request a job",
};

export default function RequestPage() {
  return (
    <section className="flex flex-col md:items-center gap-4 h-full sm:max-w-[768px] lg:max-w-[960px] py-24 px-6 md:px-10 lg:px-16 xl:px-24">
      <h1 className="scroll-m-20 w-full text-4xl font-extrabold text-left tracking-tight lg:text-5xl">
        Request a job
      </h1>
      <Separator />
      <RequestJobForm />
    </section>
  );
}
