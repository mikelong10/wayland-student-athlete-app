import { cn } from "@lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AdminActions({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn("border-border rounded-xl border", className)}
    >
      <AccordionItem value="admin-actions" className="border-none">
        <AccordionTrigger className="gap-2 px-4 hover:no-underline">
          {title}
        </AccordionTrigger>
        <AccordionContent className="py-4">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
