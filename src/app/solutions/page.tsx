import { MarketingStory, StoryCtas } from "@/components/marketing/story";

export const metadata = { title: "Solutions · LOOP" };

export default function SolutionsPage() {
  const audiences = [
    {
      title: "Product managers",
      copy: "See which problems are growing, which are noise, and which quotes belong in the next planning review.",
    },
    {
      title: "Support leaders",
      copy: "Turn ticket volume into themes. Spot repeats. Hand product a brief that is already classified.",
    },
    {
      title: "Founders",
      copy: "A Voice-of-Customer narrative you can read in five minutes — grounded in what customers actually said this week.",
    },
  ];

  return (
    <MarketingStory
      eyebrow="Solutions"
      title="Built for the people who own the customer."
      description="LOOP is for product, support and founders who cannot afford to argue from memory."
      actions={<StoryCtas />}
    >
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {audiences.map((item) => (
            <article key={item.title} className="rounded-xl border border-line p-6">
              <h2 className="font-display text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </MarketingStory>
  );
}
