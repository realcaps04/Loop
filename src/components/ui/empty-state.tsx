import { cn } from "@/lib/cn";

export function EmptyState({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center rounded-lg border border-dashed border-line bg-white px-6 py-10",
        className,
      )}
    >
      <p className="font-display text-base font-semibold tracking-tight text-ink">
        {title}
      </p>
      <p className="mt-1 max-w-md text-sm text-ink-muted">{description}</p>
      {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
