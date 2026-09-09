import { MarketingStory, StoryCtas } from "@/components/marketing/story";

export const metadata = { title: "Pricing · LOOP" };

export default function PricingPage() {
  return (
    <MarketingStory
      eyebrow="Pricing"
      title="Start free. Invite your team. Close the loop."
      description="LOOP is in workspace preview. Create a workspace, invite Admin, Analyst and Viewer, and work from classified feedback. No credit card. No invented tiers."
      actions={<StoryCtas />}
    >
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-xl border border-line p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
              Workspace
            </p>
            <p className="mt-2 font-display text-3xl font-semibold">Free</p>
            <p className="mt-2 text-sm text-ink-muted">
              One workspace. Unlimited classified feedback in this preview. Three roles.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ink-secondary">
              <li>Inbox, themes, trends</li>
              <li>Ask LOOP with evidence</li>
              <li>Voice-of-Customer reports</li>
            </ul>
          </article>
          <article className="rounded-xl border border-line p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
              Included roles
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ink-secondary">
              <li>
                <span className="font-medium text-ink">Admin</span> — members, roles, workspace.
              </li>
              <li>
                <span className="font-medium text-ink">Analyst</span> — ingest and manage feedback.
              </li>
              <li>
                <span className="font-medium text-ink">Viewer</span> — read-only intelligence.
              </li>
            </ul>
          </article>
          <article className="rounded-xl border border-accent bg-accent-soft/40 p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-accent">
              Northstar demo
            </p>
            <p className="mt-2 font-display text-xl font-semibold">
              Already seeded. Already classified.
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Open the live workspace as Maya Chen and see what 30 days of customer
              feedback looks like when LOOP has closed the loop.
            </p>
          </article>
        </div>
      </section>
    </MarketingStory>
  );
}
