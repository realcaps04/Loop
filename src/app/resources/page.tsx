import Link from "next/link";
import { MarketingStory } from "@/components/marketing/story";

export const metadata = { title: "Resources · LOOP" };

export default function ResourcesPage() {
  const guides = [
    {
      href: "/how-it-works",
      title: "How LOOP classifies feedback",
      copy: "Sentiment, theme, feature area, and a rationale grounded in the original wording.",
    },
    {
      href: "/ask",
      title: "Asking questions without inventing answers",
      copy: "Every Ask LOOP response attaches source quotes. Open the workspace and try it.",
    },
    {
      href: "/reports",
      title: "Writing a Voice-of-Customer report",
      copy: "From classified feedback to an executive narrative. No blank template.",
    },
    {
      href: "/dashboard",
      title: "Walk the Northstar workspace",
      copy: "The fastest way to understand LOOP is to use it with real (seeded) customer language.",
    },
  ];

  return (
    <MarketingStory
      eyebrow="Resources"
      title="Guides for people who have to decide."
      description="Short, specific, and tied to the product — not a content farm."
    >
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-xl border border-line p-6 transition-colors hover:bg-canvas"
            >
              <h2 className="font-display text-xl font-semibold">{guide.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{guide.copy}</p>
            </Link>
          ))}
        </div>
      </section>
    </MarketingStory>
  );
}
