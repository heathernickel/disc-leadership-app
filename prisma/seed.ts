import { PrismaClient } from "@prisma/client";
import { scoreAssessment } from "../src/lib/disc/scoring";
import { discQuestions } from "../src/lib/disc/questions";

const prisma = new PrismaClient();

function randomAnswers() {
  return Object.fromEntries(discQuestions.map((q) => [q.id, Math.floor(Math.random() * 5) + 1]));
}

async function main() {
  for (const person of [
    { firstName: "Ava", lastName: "Patel", email: "ava@northstar.com", company: "Northstar", role: "VP Operations" },
    { firstName: "Mason", lastName: "Reed", email: "mason@northstar.com", company: "Northstar", role: "Engineering Director" },
    { firstName: "Lena", lastName: "Kim", email: "lena@northstar.com", company: "Northstar", role: "People Manager" }
  ]) {
    const answers = randomAnswers();
    const result = scoreAssessment(answers);
    await prisma.assessmentSubmission.create({
      data: {
        ...person,
        answersJson: answers,
        dScore: result.dScore,
        iScore: result.iScore,
        sScore: result.sScore,
        cScore: result.cScore,
        primaryStyle: result.primaryStyle,
        secondaryStyle: result.secondaryStyle,
        blendLabel: result.blendLabel,
        narrativeJson: result.narrative,
        completed: true,
        answers: { create: Object.entries(answers).map(([questionId, value]) => ({ questionId, value })) }
      }
    });
  }
}

main().finally(async () => prisma.$disconnect());
