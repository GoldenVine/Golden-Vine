import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionSectionProps {
  items: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
}

export function AccordionSection({ items }: AccordionSectionProps) {
  return (
    <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-4">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} className="border-b border-foreground/20 bg-card rounded-lg px-4 shadow-sm">
          <AccordionTrigger className="font-serif text-lg font-semibold text-left text-foreground hover:no-underline py-4">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="text-base font-sans pb-6 leading-relaxed">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
