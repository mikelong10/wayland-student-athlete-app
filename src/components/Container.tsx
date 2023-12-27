import { cn } from "@lib/utils";

export default function Container({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        className,
        "xs:px-8 w-full px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32"
      )}
    >
      {children}
    </section>
  );
}
