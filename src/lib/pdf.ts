import jsPDF from "jspdf";
import { DiscResult } from "@/lib/disc/types";

export function generateReportPdf(result: DiscResult, name: string) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Leadership DISC Profile Report", 14, 20);
  doc.setFontSize(11);
  doc.text(`Participant: ${name || "Anonymous"}`, 14, 30);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 37);
  doc.text(`Primary style: ${result.primaryStyle} | Secondary: ${result.secondaryStyle}`, 14, 46);
  doc.text(`Scores - D:${result.dScore} I:${result.iScore} S:${result.sScore} C:${result.cScore}`, 14, 53);
  doc.text(result.narrative.blendIntro, 14, 63, { maxWidth: 180 });
  doc.text("Strengths", 14, 80);
  result.narrative.primary.strengths.forEach((item, idx) => doc.text(`• ${item}`, 18, 88 + idx * 7));
  doc.text("Blind spots", 14, 113);
  result.narrative.primary.blindSpots.forEach((item, idx) => doc.text(`• ${item}`, 18, 121 + idx * 7));
  doc.text("Leadership recommendations", 14, 146);
  result.narrative.primary.leadershipTips.forEach((item, idx) => doc.text(`• ${item}`, 18, 154 + idx * 7));
  return doc;
}
