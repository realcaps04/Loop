import { SiteShell } from "@/components/marketing/site-shell";
import { HowHero } from "@/components/marketing/how-hero";
import { HowApproachSection } from "@/components/marketing/how-approach-section";
import { HowWhySection } from "@/components/marketing/how-why-section";

export const metadata = { title: "How it works · LOOP" };

export default function HowItWorksPage() {
  return (
    <SiteShell>
      <HowHero />
      <HowApproachSection />
      <HowWhySection />
    </SiteShell>
  );
}
