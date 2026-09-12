import { SiteShell } from "@/components/marketing/site-shell";
import { PricingSection } from "@/components/marketing/pricing-section";

export const metadata = { title: "Pricing · LOOP" };

export default function PricingPage() {
  return (
    <SiteShell>
      <PricingSection />
    </SiteShell>
  );
}
