import { SiteShell } from "@/components/marketing/site-shell";
import { FeaturesHero } from "@/components/marketing/features-hero";
import { FeaturesHowSection } from "@/components/marketing/features-how-section";
import { BrandWord } from "@/components/brand/brand-word";
import {
  FileText,
  Inbox,
  Layers3,
  MessageSquareText,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/cn";

export const metadata = { title: "Features · LOOP" };

const FEATURES = [
  {
    title: "Multi-channel collection",
    copy: "Gather feedback from support tickets, surveys, app stores, social media and more.",
    Icon: MessageSquareText,
    tint: "bg-violet-100 text-violet-600",
  },
  {
    title: "Feedback Inbox",
    copy: "Search, filter and act. Move items from New to Reviewed to Actioned without losing the original wording.",
    Icon: Inbox,
    tint: "bg-sky-100 text-sky-600",
  },
  {
    title: "AI-powered analysis",
    copy: "Detect sentiment, identify key themes, and surface meaningful insights instantly.",
    Icon: Sparkles,
    tint: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Themes & clusters",
    copy: "Onboarding, billing, authentication, mobile — the topics customers keep talking about, with evidence attached.",
    Icon: Layers3,
    tint: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Trend detection",
    copy: "See which themes are accelerating before they become a support pile-up or a renewal risk.",
    Icon: TrendingUp,
    tint: "bg-rose-100 text-rose-600",
  },
  {
    title: "Ask LOOP",
    copy: "Plain-English questions. Grounded answers. Supporting quotes you can click through.",
    Icon: Sparkles,
    tint: "bg-amber-100 text-amber-700",
  },
  {
    title: "Voice of Customer reports",
    copy: "Executive-ready narrative: what changed, what customers said, and what to do next.",
    Icon: FileText,
    tint: "bg-pink-100 text-pink-600",
  },
  {
    title: "Roles that mean something",
    copy: "Admin, Analyst and Viewer. Restricted actions stay visible, with an explanation — not a missing button.",
    Icon: Shield,
    tint: "bg-slate-100 text-slate-600",
  },
];

export default function FeaturesPage() {
  return (
    <SiteShell>
      <FeaturesHero />
      <FeaturesHowSection />

      <section id="all-features" className="scroll-mt-20 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]/80">
              All features
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              A workspace for people who have to decide.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
              Inbox, themes, trends, Ask <BrandWord />, and reports are one
              system. The same classified feedback powers every surface.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ title, copy, Icon, tint }) => (
              <article
                key={title}
                className="rounded-2xl bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.07)]"
              >
                <div
                  className={cn(
                    "inline-flex size-11 items-center justify-center rounded-xl",
                    tint,
                  )}
                >
                  <Icon className="size-5" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-display text-[17px] font-semibold tracking-tight text-navy">
                  {title === "Ask LOOP" ? (
                    <>
                      Ask <BrandWord />
                    </>
                  ) : (
                    title
                  )}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
