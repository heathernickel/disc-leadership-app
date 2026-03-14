import { blendNarratives } from "@/lib/disc/blends";
import { styleNarratives } from "@/lib/disc/narratives";
import { discQuestions } from "@/lib/disc/questions";
import { DiscResult, DiscStyle } from "@/lib/disc/types";

export type AnswerMap = Record<string, number>;

const styleOrder: DiscStyle[] = ["D", "I", "S", "C"];

const normalizeScore = (raw: number, max: number) => Math.round((raw / max) * 100);

export function scoreAssessment(answers: AnswerMap): DiscResult {
  const totals = { D: 0, I: 0, S: 0, C: 0 };
  const maxTotals = { D: 0, I: 0, S: 0, C: 0 };

  for (const question of discQuestions) {
    const answer = answers[question.id];
    const scoreMap = question.scoring[answer] ?? {};

    for (const style of styleOrder) {
      const allWeights = Object.values(question.scoring).map((entry) => entry[style] ?? 0);
      maxTotals[style] += Math.max(...allWeights, 0);
      totals[style] += scoreMap[style] ?? 0;
    }
  }

  const normalized = {
    D: normalizeScore(totals.D, maxTotals.D || 1),
    I: normalizeScore(totals.I, maxTotals.I || 1),
    S: normalizeScore(totals.S, maxTotals.S || 1),
    C: normalizeScore(totals.C, maxTotals.C || 1)
  };

  const ranked = styleOrder
    .map((style) => ({ style, score: normalized[style] }))
    .sort((a, b) => b.score - a.score || styleOrder.indexOf(a.style) - styleOrder.indexOf(b.style));

  const primaryStyle = ranked[0].style;
  const secondaryStyle = ranked[1].style;
  const blendLabel = `${primaryStyle}${secondaryStyle}`;

  return {
    dScore: normalized.D,
    iScore: normalized.I,
    sScore: normalized.S,
    cScore: normalized.C,
    primaryStyle,
    secondaryStyle,
    blendLabel,
    narrative: {
      primary: styleNarratives[primaryStyle],
      blendIntro:
        blendNarratives[blendLabel] ??
        `You show a ${primaryStyle}/${secondaryStyle} leadership blend, balancing both pace and people in your approach.`
    }
  };
}

export const toChartData = (result: DiscResult) => [
  { dimension: "D", score: result.dScore },
  { dimension: "I", score: result.iScore },
  { dimension: "S", score: result.sScore },
  { dimension: "C", score: result.cScore }
];
