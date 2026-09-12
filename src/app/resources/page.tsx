import { SiteShell } from "@/components/marketing/site-shell";
import { ResourcesPageContent } from "@/components/marketing/resources-page";

export const metadata = { title: "Resources · LOOP" };

export default function ResourcesPage() {
  return (
    <SiteShell>
      <ResourcesPageContent />
    </SiteShell>
  );
}
