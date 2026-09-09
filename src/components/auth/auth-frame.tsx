import { Logo } from "@/components/brand/logo";

export function AuthFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between border-r border-line bg-white px-10 py-10 lg:flex">
        <Logo />
        <div className="max-w-md">
          <p className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink">
            Turn customer feedback into your next best decision.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            LOOP reads tickets, reviews, surveys and notes — then returns
            sentiment, themes, and evidence you can stand behind.
          </p>
          <div className="mt-8 overflow-hidden rounded-lg border border-line shadow-loop">
            <div className="border-b border-line-subtle px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.08em] text-ink-muted">
                This week at Northstar
              </p>
              <p className="mt-1 font-display text-lg font-semibold">
                Authentication +61%
              </p>
            </div>
            <div className="space-y-3 px-4 py-4">
              <PreviewRow label="Onboarding" value="284" tone="neg" />
              <PreviewRow label="Support" value="211" tone="mix" />
              <PreviewRow label="Reporting" value="98" tone="pos" />
              <p className="pt-1 text-[12px] text-ink-faint">
                Grounded in classified customer wording — not a model guess.
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs text-ink-faint">Close the loop on customer feedback.</p>
      </aside>
      <main className="flex items-center justify-center bg-canvas px-6 py-12">
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}

function PreviewRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "neg" | "pos" | "mix";
}) {
  const bar =
    tone === "neg"
      ? "bg-sentiment-negative"
      : tone === "pos"
        ? "bg-sentiment-positive"
        : "bg-stone-400";
  const width = tone === "neg" ? "w-4/5" : tone === "pos" ? "w-1/3" : "w-3/5";
  return (
    <div>
      <div className="flex items-center justify-between text-[13px]">
        <span>{label}</span>
        <span className="tabular text-ink-muted">{value}</span>
      </div>
      <div className="mt-1 h-1 rounded-full bg-line-subtle">
        <div className={`h-1 rounded-full ${bar} ${width}`} />
      </div>
    </div>
  );
}
