import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink shadow-loop-sm transition-colors placeholder:text-ink-faint hover:border-stone-300 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15",
        className,
      )}
      {...props}
    />
  );
});
