import { ThemeDetailView } from "@/components/themes/theme-detail-view";

export default function ThemeDetailPage({ params }: { params: { id: string } }) {
  return <ThemeDetailView id={params.id} />;
}
