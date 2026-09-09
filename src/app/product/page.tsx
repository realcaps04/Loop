import { SiteShell } from "@/components/marketing/site-shell";
import { ProductHero } from "@/components/marketing/product-hero";
import { ProductUnifySection } from "@/components/marketing/product-unify-section";
import { ProductAISection } from "@/components/marketing/product-ai-section";
import { ProductThemesSection } from "@/components/marketing/product-themes-section";
import { ProductHowSection } from "@/components/marketing/product-how-section";
import { ProductFeaturesSection } from "@/components/marketing/product-features-section";
import { ProductStoriesSection } from "@/components/marketing/product-stories-section";
import { ProductFaqSection } from "@/components/marketing/product-faq-section";

export const metadata = { title: "Product · LOOP" };

export default function ProductPage() {
  return (
    <SiteShell>
      <ProductHero />
      <ProductUnifySection />
      <ProductAISection />
      <ProductThemesSection />
      <ProductHowSection />
      <ProductFeaturesSection />
      <ProductStoriesSection />
      <ProductFaqSection />
    </SiteShell>
  );
}
