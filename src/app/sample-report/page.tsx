import { Card, SectionTitle } from "@/components/ui";

export default function SampleReportPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Sample Leadership Report" subtitle="Preview the report structure leaders receive after completing the assessment." />
      <Card>
        <h2 className="text-2xl font-semibold">Sample Profile: DI (Dominance / Influence)</h2>
        <p className="mt-2 text-slate-600">This profile combines fast decision-making with persuasive communication. These leaders thrive in growth-stage environments where alignment and pace both matter.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div><h3 className="font-semibold">Strengths</h3><ul className="text-sm text-slate-600"><li>• Creates momentum</li><li>• Communicates vision clearly</li><li>• Acts decisively</li></ul></div>
          <div><h3 className="font-semibold">Growth edge</h3><p className="text-sm text-slate-600">Slow down long enough to align expectations and reduce downstream rework.</p></div>
        </div>
      </Card>
    </div>
  );
}
