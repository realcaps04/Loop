import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-ink">
      <MarketingNav />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}
