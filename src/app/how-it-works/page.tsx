import { MarketingStory, StoryCtas } from "@/components/marketing/story";

export const metadata = { title: "How it works · LOOP" };

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Create a workspace",
      copy: "Northstar is the demo tenant. Your own workspace is the same model: one team, one feedback corpus, three roles.",
    },
    {
      title: "Bring feedback in",
      copy: "Paste a ticket, import a CSV, or simulate Support, App Store, NPS or Community. LOOP never pretends those are live vendor pipes.",
    },
    {
      title: "Let LOOP classify",
      copy: "Sentiment, theme, feature area, and a rationale written from the original wording.",
    },
    {
      title: "Ask, then decide",
      copy: "Ask LOOP a question, inspect the evidence, and generate a Voice-of-Customer report for the rest of the team.",
    },
  ];

  return (
    <MarketingStory
      eyebrow="How it works"
      title="Feedback in. Insights out."
      description="Four steps. No mystery. The same loop, whether you are evaluating LOOP or running it with your team."
      actions={<StoryCtas />}
    >
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <ol className="space-y-8">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-5">
              <span className="font-display text-sm font-semibold text-accent">
                0{index + 1}
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </MarketingStory>
  );
}
