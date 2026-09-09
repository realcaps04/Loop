"use client";

import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { FEEDBACK } from "@/lib/data/demo";

export function ReportDetailView({ id }: { id: string }) {
  const quotes = FEEDBACK.filter((item) => item.sentiment === "negative").slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 py-6 md:px-6">
      <PageHeader
        eyebrow="Voice of Customer"
        title="Weekly Customer Intelligence"
        description="Sep 2 – Sep 8 · Generated from classified Northstar feedback."
        actions={
          <>
            <Button variant="secondary">Export PDF</Button>
            <Button variant="secondary">Shareable page</Button>
          </>
        }
      />
      <Card className="space-y-6 p-6">
        <section>
          <h2 className="font-display text-base font-semibold">Executive summary</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
            Authentication is the steepest change this week. Onboarding is still the largest
            source of negative volume. These conclusions are drawn from the classified feedback
            in this workspace, not from a model prior.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-semibold">Notable customer quotes</h2>
          <ul className="mt-3 space-y-3">
            {quotes.map((item) => (
              <li key={item.id} className="rounded-md bg-canvas px-3 py-3 text-sm">
                “{item.content}”
                <p className="mt-1 text-[12px] text-ink-muted">{item.customerLabel}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-base font-semibold">Recommended actions</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink-secondary">
            <li>Stabilize SSO and session expiry before the next release window.</li>
            <li>Put SSO and invites in the first-run checklist.</li>
            <li>Reproduce iOS report crashes with the quoted OS versions.</li>
          </ol>
        </section>
        <p className="text-[12px] text-ink-faint">Report id {id}</p>
      </Card>
    </div>
  );
}
