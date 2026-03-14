import Link from "next/link";
import { Card, SectionTitle } from "@/components/ui";

const faqs = [
  { q: "Is this a clinical assessment?", a: "No. This is a DISC-style leadership self-awareness tool for development and coaching conversations." },
  { q: "How long does it take?", a: "Most leaders complete the assessment in 8–10 minutes." },
  { q: "Can we use this with teams?", a: "Yes. HR and enablement teams can use the admin dashboard to review aggregate trends." }
];

export default function HomePage() {
  return (
    <div className="space-y-14">
      <section className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-brand-600">Leadership capability insight</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Build self-awareness. Lead teams with greater clarity.</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">Leadership DISC Profile helps managers and founders understand their default leadership tendencies and turn insight into practical action.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/assessment" className="rounded-md bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">Start Assessment</Link>
          <Link href="/sample-report" className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">See Sample Report</Link>
        </div>
      </section>

      <section>
        <SectionTitle title="What this measures" subtitle="A workplace-focused DISC-style profile across four dimensions." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["D", "Dominance", "Pace, assertiveness, and decision speed."],
            ["I", "Influence", "Communication, persuasion, and social energy."],
            ["S", "Steadiness", "Consistency, collaboration, and reliability."],
            ["C", "Conscientiousness", "Quality, structure, and risk awareness."]
          ].map(([code, title, text]) => (
            <Card key={code}><h3 className="text-lg font-semibold">{code} · {title}</h3><p className="mt-2 text-sm text-slate-600">{text}</p></Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card><SectionTitle title="Why leaders use it" /><ul className="space-y-2 text-slate-600"><li>• Improve communication with different personalities</li><li>• Make better delegation and hiring decisions</li><li>• Reduce friction under pressure</li><li>• Build more balanced leadership teams</li></ul></Card>
        <Card><SectionTitle title="What your report includes" /><ul className="space-y-2 text-slate-600"><li>• Primary and secondary DISC style with score breakdown</li><li>• Strengths and likely blind spots</li><li>• Communication and decision-making tendencies</li><li>• Practical tips to lead more effectively</li></ul></Card>
      </section>

      <section>
        <SectionTitle title="FAQ" />
        <div className="space-y-3">
          {faqs.map((faq) => (
            <Card key={faq.q}><h3 className="font-semibold">{faq.q}</h3><p className="mt-1 text-slate-600">{faq.a}</p></Card>
          ))}
        </div>
      </section>
    </div>
  );
}
