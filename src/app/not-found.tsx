import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <div className="max-w-md">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
          This page is not in the loop.
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          The route you requested does not exist in this workspace.
        </p>
        <Link href="/dashboard" className={cn(buttonVariants(), "mt-5")}>
          Back to overview
        </Link>
      </div>
    </div>
  );
}
