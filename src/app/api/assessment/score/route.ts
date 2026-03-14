import { NextResponse } from "next/server";
import { scoreAssessment } from "@/lib/disc/scoring";
import { assessmentAnswersSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = assessmentAnswersSchema.safeParse(body.answers);
  if (!parsed.success) return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  const result = scoreAssessment(parsed.data);
  return NextResponse.json(result);
}
