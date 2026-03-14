"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { discQuestions } from "@/lib/disc/questions";
import { Card } from "@/components/ui";
import { Progress } from "@/components/progress";

const STORAGE_KEY = "leadership_disc_answers";

export default function AssessmentPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const question = discQuestions[index];
  const progress = Math.round((Object.keys(answers).length / discQuestions.length) * 100);
  const canNext = Boolean(answers[question.id]);
  const isLast = index === discQuestions.length - 1;

  const handleFinish = async () => {
    const res = await fetch("/api/assessment/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers })
    });
    const data = await res.json();
    sessionStorage.setItem("disc_result", JSON.stringify(data));
    router.push("/results");
  };

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-semibold">Leadership DISC Assessment</h1>
      <p className="text-slate-600">Rate each statement based on how you typically lead at work.</p>
      <Progress value={progress} />
      <p className="text-sm text-slate-500">Question {index + 1} of {discQuestions.length} · {answeredCount} answered</p>

      <Card className="space-y-6">
        <h2 className="text-xl font-medium">{question.prompt}</h2>
        <fieldset className="space-y-3">
          <legend className="sr-only">Select response</legend>
          {question.options.map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-slate-50">
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={answers[question.id] === option.value}
                onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: option.value }))}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </fieldset>
      </Card>

      <div className="flex items-center justify-between">
        <button className="rounded border px-4 py-2" onClick={() => setIndex((v) => Math.max(v - 1, 0))} disabled={index === 0}>Back</button>
        {isLast ? (
          <button className="rounded bg-brand-600 px-4 py-2 font-medium text-white disabled:opacity-60" onClick={handleFinish} disabled={answeredCount !== discQuestions.length}>Finish Assessment</button>
        ) : (
          <button className="rounded bg-brand-600 px-4 py-2 font-medium text-white disabled:opacity-60" onClick={() => setIndex((v) => Math.min(v + 1, discQuestions.length - 1))} disabled={!canNext}>Next</button>
        )}
      </div>
    </div>
  );
}
