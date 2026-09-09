import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <div className="max-w-md">
        <p className="eyebrow">403</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
          You can see this workspace. You cannot change it.
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Your role is viewer. Ask an admin if you need to ingest feedback or
          manage members.
        </p>
        <Link href="/dashboard" className={cn(buttonVariants(), "mt-5")}>
          Return to overview
        </Link>
      </div>
    </div>
  );
}
