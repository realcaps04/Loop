import { cn } from "@/lib/cn";

/** Brand wordmark — Gropled + brand blue everywhere. */
export function BrandWord({
  className,
  as: Tag = "span",
  inverted = false,
}: {
  className?: string;
  as?: "span" | "strong" | "em";
  inverted?: boolean;
}) {
  return (
    <Tag
      className={cn(
        "font-brand",
        inverted ? "text-white" : "text-[#494AFD]",
        className,
      )}
    >
      LOOP
    </Tag>
  );
}

/** Split a label like "Ask LOOP" so only LOOP gets brand styling. */
export function withBrandWord(label: string, className?: string) {
  if (!label.includes("LOOP")) return label;
  const parts = label.split(/LOOP/g);
  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 ? <BrandWord className={className} /> : null}
        </span>
      ))}
    </>
  );
}
