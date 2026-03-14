"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { DiscBarChart } from "@/components/disc-chart";
import { Card, SectionTitle } from "@/components/ui";
import { toChartData } from "@/lib/disc/scoring";
import { DiscResult } from "@/lib/disc/types";
import { generateReportPdf } from "@/lib/pdf";

type SaveForm = { firstName?: string; lastName?: string; email?: string; company?: string; role?: string };

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<DiscResult | null>(null);
  const [status, setStatus] = useState<string>("");
  const { register, handleSubmit } = useForm<SaveForm>();

  useEffect(() => {
    const raw = sessionStorage.getItem("disc_result");
    if (!raw) {
      router.push("/assessment");
      return;
    }
    setResult(JSON.parse(raw));
  }, [router]);

  const chartData = useMemo(() => (result ? toChartData(result) : []), [result]);

  if (!result) return <p>Loading results...</p>;

  const onSave = handleSubmit(async (values) => {
    const answers = JSON.parse(localStorage.getItem("leadership_disc_answers") || "{}");
    const res = await fetch("/api/assessment/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, answers })
    });
    setStatus(res.ok ? "Results saved successfully." : "Unable to save results.");
  });

  const downloadPdf = () => {
    const name = `${(document.getElementById("firstName") as HTMLInputElement)?.value || ""} ${(document.getElementById("lastName") as HTMLInputElement)?.value || ""}`.trim();
    const doc = generateReportPdf(result, name);
    doc.save("leadership-disc-profile-report.pdf");
  };

  return (
    <div className="space-y-8">
      <SectionTitle title="Your Leadership DISC Profile" subtitle="DISC-style behavioral insights for leadership development, not a clinical diagnosis." />
      <Card>
        <p className="text-sm uppercase tracking-wide text-slate-500">Profile blend</p>
        <h2 className="mt-1 text-3xl font-semibold">{result.primaryStyle}/{result.secondaryStyle}</h2>
        <p className="mt-2 text-slate-600">{result.narrative.blendIntro}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-4 text-sm"><p>D: {result.dScore}</p><p>I: {result.iScore}</p><p>S: {result.sScore}</p><p>C: {result.cScore}</p></div>
        <DiscBarChart data={chartData} />
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card><h3 className="font-semibold">Your leadership style</h3><p className="mt-3 text-sm text-slate-600">{result.narrative.primary.overview}</p></Card>
        <Card><h3 className="font-semibold">What drives you</h3><ul className="mt-3 space-y-2 text-sm text-slate-600">{result.narrative.primary.coreMotivators.map((i) => <li key={i}>• {i}</li>)}</ul></Card>
        <Card><h3 className="font-semibold">What your team likely appreciates</h3><ul className="mt-3 space-y-2 text-sm text-slate-600">{result.narrative.primary.strengths.map((i) => <li key={i}>• {i}</li>)}</ul></Card>
        <Card><h3 className="font-semibold">Where friction may appear</h3><ul className="mt-3 space-y-2 text-sm text-slate-600">{result.narrative.primary.blindSpots.map((i) => <li key={i}>• {i}</li>)}</ul></Card>
        <Card><h3 className="font-semibold">How to communicate effectively</h3><p className="mt-3 text-sm text-slate-600">{result.narrative.primary.communicationStyle}</p></Card>
        <Card><h3 className="font-semibold">Decision-making tendencies</h3><p className="mt-3 text-sm text-slate-600">{result.narrative.primary.decisionStyle}</p></Card>
        <Card><h3 className="font-semibold">How others may experience you</h3><p className="mt-3 text-sm text-slate-600">{result.narrative.primary.teamExperience}</p></Card>
        <Card><h3 className="font-semibold">What to watch under pressure</h3><p className="mt-3 text-sm text-slate-600">{result.narrative.primary.underStress}</p></Card>
        <Card><h3 className="font-semibold">Practical leadership tips</h3><ul className="mt-3 space-y-2 text-sm text-slate-600">{result.narrative.primary.leadershipTips.map((i) => <li key={i}>• {i}</li>)}</ul></Card>
        <Card><h3 className="font-semibold">Suggested team complements</h3><p className="mt-3 text-sm text-slate-600">{result.narrative.primary.oppositeStylePartnership}</p></Card>
        <Card><h3 className="font-semibold">Best-fit responsibilities</h3><ul className="mt-3 space-y-2 text-sm text-slate-600">{result.narrative.primary.bestFitResponsibilities.map((i) => <li key={i}>• {i}</li>)}</ul></Card>
        <Card><h3 className="font-semibold">Growth edge for this style</h3><p className="mt-3 text-sm text-slate-600">{result.narrative.primary.growthEdge}</p></Card>
      </div>

      <Card>
        <h3 className="font-semibold">Save your result (optional)</h3>
        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={onSave}>
          <input id="firstName" placeholder="First name" className="rounded border p-2" {...register("firstName")} />
          <input id="lastName" placeholder="Last name" className="rounded border p-2" {...register("lastName")} />
          <input id="email" type="email" placeholder="Email" className="rounded border p-2" {...register("email")} />
          <input placeholder="Company" className="rounded border p-2" {...register("company")} />
          <input placeholder="Role" className="rounded border p-2 md:col-span-2" {...register("role")} />
          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button className="rounded bg-brand-600 px-4 py-2 text-white" type="submit">Save Results</button>
            <button className="rounded border px-4 py-2" type="button" onClick={downloadPdf}>Download PDF</button>
                      </div>
        </form>
        {status ? <p className="mt-3 text-sm text-slate-600">{status}</p> : null}
      </Card>
    </div>
  );
}
