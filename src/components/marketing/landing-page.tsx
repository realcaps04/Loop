import { SiteShell } from "@/components/marketing/site-shell";
import { MarketingHero } from "@/components/marketing/hero";
import {
  AskSection,
  Capabilities,
  FinalCta,
  Testimonials,
  TrustBar,
  ValueGrid,
  WorkflowSection,
} from "@/components/marketing/sections";

export function LandingPage() {
  return (
    <SiteShell>
      <MarketingHero />
      <TrustBar />
      <ValueGrid />
      <WorkflowSection />
      <AskSection />
      <Capabilities />
      <Testimonials />
      <FinalCta />
    </SiteShell>
  );
}
