import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-line-subtle px-1.5 py-0.5 text-[11px] font-medium text-ink-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-line bg-white px-1 font-sans text-[10px] font-medium text-ink-muted">
      {children}
    </kbd>
  );
}
