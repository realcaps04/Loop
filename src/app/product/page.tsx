import { SiteShell } from "@/components/marketing/site-shell";
import { ProductHero } from "@/components/marketing/product-hero";
import { ProductUnifySection } from "@/components/marketing/product-unify-section";
import { ProductAISection } from "@/components/marketing/product-ai-section";
import { ProductThemesSection } from "@/components/marketing/product-themes-section";
import { BrandWord } from "@/components/brand/brand-word";

export const metadata = { title: "Product · LOOP" };

export default function ProductPage() {
  const stages = [
    {
      from: "Raw feedback",
      to: "Tickets, reviews, surveys and notes, in the customer's own words.",
    },
    {
      from: "AI understanding",
      to: "Sentiment, theme and feature area — with a written rationale.",
    },
    {
      from: "Themes",
      to: "The topics customers keep returning to, ranked by volume and heat.",
    },
    {
      from: "Trends",
      to: "What accelerated, what cooled, and what just appeared.",
    },
    {
      from: "Evidence",
      to: "Every claim opens the original quote. Nothing invented.",
    },
    {
      from: "Decisions",
      to: "Voice-of-Customer reports your leadership can actually use.",
    },
  ];

  return (
    <SiteShell>
      <ProductHero />
      <ProductUnifySection />
      <ProductAISection />
      <ProductThemesSection />
      <section className="border-t border-slate-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
            How <BrandWord /> works
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center font-display text-3xl font-bold tracking-tight text-navy">
            From raw feedback to decisions your team can trust.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stages.map((stage, index) => (
              <article
                key={stage.from}
                className="rounded-2xl bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.07)]"
              >
                <p className="font-display text-sm font-semibold text-[#494AFD]">
                  0{index + 1}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-navy">
                  {stage.from}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {stage.to}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
