import { ReportDetailView } from "@/components/reports/report-detail-view";

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  return <ReportDetailView id={params.id} />;
}
