import { SiteShell } from "@/components/marketing/site-shell";
import { SolutionsHero } from "@/components/marketing/solutions-hero";
import { SolutionsTeamsSection } from "@/components/marketing/solutions-teams-section";
import { SolutionsIntegrationsSection } from "@/components/marketing/solutions-integrations-section";

export const metadata = { title: "Solutions · LOOP" };

export default function SolutionsPage() {
  return (
    <SiteShell>
      <SolutionsHero />
      <SolutionsTeamsSection />
      <SolutionsIntegrationsSection />
    </SiteShell>
  );
}
