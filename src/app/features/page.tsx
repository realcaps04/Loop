import { SiteShell } from "@/components/marketing/site-shell";
import { FeaturesHero } from "@/components/marketing/features-hero";
import { FeaturesHowSection } from "@/components/marketing/features-how-section";
import { FeaturesShowcaseSection } from "@/components/marketing/features-showcase-section";
import { FeaturesAiSection } from "@/components/marketing/features-ai-section";
import { FeaturesSocialSection } from "@/components/marketing/features-social-section";
import { FeaturesFaqSection } from "@/components/marketing/features-faq-section";

export const metadata = { title: "Features · LOOP" };

export default function FeaturesPage() {
  return (
    <SiteShell>
      <FeaturesHero />
      <FeaturesHowSection />
      <FeaturesShowcaseSection />
      <FeaturesAiSection />
      <FeaturesSocialSection />
      <FeaturesFaqSection />
    </SiteShell>
  );
}
