import { cn } from "@/lib/cn";

export function Avatar({
  initials,
  size = "md",
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-accent-soft font-display text-accent",
        size === "sm" && "size-6 text-[10px] font-semibold",
        size === "md" && "size-8 text-xs font-semibold",
        size === "lg" && "size-10 text-sm font-semibold",
      )}
    >
      {initials}
    </span>
  );
}
