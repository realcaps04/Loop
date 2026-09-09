import { MarketingStory, StoryCtas } from "@/components/marketing/story";

export const metadata = { title: "Features · LOOP" };

export default function FeaturesPage() {
  const features = [
    {
      title: "Feedback Inbox",
      copy: "Search, filter and act. Status moves from New to Reviewed to Actioned without losing the original wording.",
    },
    {
      title: "Themes & clusters",
      copy: "Onboarding, billing, authentication, mobile — the topics customers keep talking about, with evidence attached.",
    },
    {
      title: "Trend detection",
      copy: "See which themes are accelerating before they become a support pile-up or a renewal risk.",
    },
    {
      title: "Ask LOOP",
      copy: "Plain-English questions. Grounded answers. Supporting quotes you can click through.",
    },
    {
      title: "Voice of Customer",
      copy: "Executive-ready narrative: what changed, what customers said, and what to do next.",
    },
    {
      title: "Roles that mean something",
      copy: "Admin, Analyst and Viewer. Restricted actions stay visible, with an explanation — not a missing button.",
    },
  ];

  return (
    <MarketingStory
      eyebrow="Features"
      title="A workspace for people who have to decide."
      description="Inbox, themes, trends, Ask LOOP and reports are one system. The same classified feedback powers every surface."
      actions={<StoryCtas />}
    >
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-xl border border-line p-6">
              <h2 className="font-display text-xl font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </MarketingStory>
  );
}
