import { cn } from "@/lib/cn";

export function LoopMark({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const left = inverted ? "#E8EAFF" : "#B4B8FF";
  const leftDeep = inverted ? "#FFFFFF" : "#8E94F8";
  const right = inverted ? "#C9CEFF" : "#3D52F5";
  const rightDeep = inverted ? "#FFFFFF" : "#2A3FE0";
  const gid = inverted ? "inv" : "std";

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn("size-7", className)}
    >
      <defs>
        <linearGradient id={`loop-right-${gid}`} x1="16" y1="8" x2="42" y2="42">
          <stop offset="0%" stopColor={right} />
          <stop offset="100%" stopColor={rightDeep} />
        </linearGradient>
        <linearGradient id={`loop-left-${gid}`} x1="4" y1="6" x2="32" y2="40">
          <stop offset="0%" stopColor={left} />
          <stop offset="100%" stopColor={leftDeep} />
        </linearGradient>
      </defs>
      <ellipse
        cx="28.4"
        cy="24"
        rx="10.6"
        ry="13.2"
        stroke={`url(#loop-right-${gid})`}
        strokeWidth="6.4"
      />
      <ellipse
        cx="19.6"
        cy="24"
        rx="10.6"
        ry="13.2"
        stroke={`url(#loop-left-${gid})`}
        strokeWidth="6.4"
      />
    </svg>
  );
}

export function Logo({
  compact = false,
  inverted = false,
}: {
  compact?: boolean;
  inverted?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        inverted ? "text-white" : "text-ink",
      )}
    >
      <LoopMark inverted={inverted} className="size-8" />
      {compact ? null : (
        <span
          className={cn(
            "font-brand text-[17px] font-bold tracking-tight",
            inverted ? "text-white" : "text-[#494AFD]",
          )}
        >
          LOOP
        </span>
      )}
    </span>
  );
}
