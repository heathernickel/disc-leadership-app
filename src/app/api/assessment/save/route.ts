import { NextResponse } from "next/server";
import { scoreAssessment } from "@/lib/disc/scoring";
import { prisma } from "@/lib/prisma";
import { saveSubmissionSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = saveSubmissionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const result = scoreAssessment(parsed.data.answers);
  const submission = await prisma.assessmentSubmission.create({
    data: {
      firstName: parsed.data.firstName || null,
      lastName: parsed.data.lastName || null,
      email: parsed.data.email || null,
      company: parsed.data.company || null,
      role: parsed.data.role || null,
      answersJson: parsed.data.answers,
      dScore: result.dScore,
      iScore: result.iScore,
      sScore: result.sScore,
      cScore: result.cScore,
      primaryStyle: result.primaryStyle,
      secondaryStyle: result.secondaryStyle,
      blendLabel: result.blendLabel,
      narrativeJson: result.narrative,
      completed: true,
      answers: {
        create: Object.entries(parsed.data.answers).map(([questionId, value]) => ({ questionId, value }))
      }
    }
  });

  return NextResponse.json({ id: submission.id });
}
