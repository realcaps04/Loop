import { cn } from "@/lib/cn";

export function Avatar({
  initials,
  src,
  size = "md",
}: {
  initials: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "sm"
      ? "size-6 text-[10px]"
      : size === "lg"
        ? "size-10 text-sm"
        : "size-8 text-xs";

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        className={cn(
          "inline-flex shrink-0 rounded-full object-cover",
          sizeClass,
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-accent-soft font-display font-semibold text-accent",
        sizeClass,
      )}
    >
      {initials}
    </span>
  );
}
