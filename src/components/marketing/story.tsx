import Link from "next/link";
import { SiteShell } from "@/components/marketing/site-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function MarketingStory({
  eyebrow,
  title,
  description,
  children,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <SiteShell>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-muted">
            {description}
          </p>
          {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </section>
      {children}
    </SiteShell>
  );
}

export function StoryCtas() {
  return (
    <>
      <Link href="/signup" className={buttonVariants({ size: "lg" })}>
        Get Started Free
      </Link>
      <Link
        href="/dashboard"
        className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
      >
        Open the Northstar demo
      </Link>
    </>
  );
}
