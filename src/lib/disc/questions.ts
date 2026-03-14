import { DiscQuestion } from "@/lib/disc/types";

export const likertOptions = [
  { label: "Strongly disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Neutral", value: 3 },
  { label: "Agree", value: 4 },
  { label: "Strongly agree", value: 5 }
] as const;

const positive = (style: "D" | "I" | "S" | "C") => ({
  1: { [style]: 0 },
  2: { [style]: 1 },
  3: { [style]: 2 },
  4: { [style]: 3 },
  5: { [style]: 4 }
});

const mixed = (a: "D" | "I" | "S" | "C", b: "D" | "I" | "S" | "C") => ({
  1: { [a]: 0, [b]: 0 },
  2: { [a]: 1, [b]: 0 },
  3: { [a]: 2, [b]: 1 },
  4: { [a]: 3, [b]: 2 },
  5: { [a]: 4, [b]: 3 }
});

// Founder note: update prompt wording, themes, or scoring weights here.
export const discQuestions: DiscQuestion[] = [
  { id: "Q01", prompt: "I make decisions quickly when direction is unclear.", format: "likert", options: [...likertOptions], scoring: positive("D"), theme: "decision making" },
  { id: "Q02", prompt: "I challenge assumptions when I think outcomes are at risk.", format: "likert", options: [...likertOptions], scoring: positive("D"), theme: "risk tolerance" },
  { id: "Q03", prompt: "I am comfortable setting ambitious targets for my team.", format: "likert", options: [...likertOptions], scoring: mixed("D", "I"), theme: "pace" },
  { id: "Q04", prompt: "I prefer direct conversations over extended debate.", format: "likert", options: [...likertOptions], scoring: positive("D"), theme: "communication" },
  { id: "Q05", prompt: "I naturally rally people around a new initiative.", format: "likert", options: [...likertOptions], scoring: positive("I"), theme: "persuasion" },
  { id: "Q06", prompt: "I energize group discussions and bring momentum.", format: "likert", options: [...likertOptions], scoring: positive("I"), theme: "communication" },
  { id: "Q07", prompt: "I adapt my message to connect with different personalities.", format: "likert", options: [...likertOptions], scoring: mixed("I", "S"), theme: "communication" },
  { id: "Q08", prompt: "I prefer influence through relationships more than authority.", format: "likert", options: [...likertOptions], scoring: positive("I"), theme: "delegation" },
  { id: "Q09", prompt: "I create calm and clarity when priorities shift.", format: "likert", options: [...likertOptions], scoring: positive("S"), theme: "change response" },
  { id: "Q10", prompt: "I am consistent in follow-through, even under pressure.", format: "likert", options: [...likertOptions], scoring: positive("S"), theme: "follow-through" },
  { id: "Q11", prompt: "I invest time to ensure everyone feels heard.", format: "likert", options: [...likertOptions], scoring: positive("S"), theme: "communication" },
  { id: "Q12", prompt: "I value stability and predictable execution.", format: "likert", options: [...likertOptions], scoring: mixed("S", "C"), theme: "planning" },
  { id: "Q13", prompt: "I want decisions backed by clear evidence and data.", format: "likert", options: [...likertOptions], scoring: positive("C"), theme: "decision making" },
  { id: "Q14", prompt: "I notice risks others miss before launch.", format: "likert", options: [...likertOptions], scoring: positive("C"), theme: "risk tolerance" },
  { id: "Q15", prompt: "I expect high standards in process and quality.", format: "likert", options: [...likertOptions], scoring: positive("C"), theme: "planning" },
  { id: "Q16", prompt: "I prepare thoroughly before presenting recommendations.", format: "likert", options: [...likertOptions], scoring: positive("C"), theme: "planning" },
  { id: "Q17", prompt: "I give clear direction when timelines are tight.", format: "likert", options: [...likertOptions], scoring: mixed("D", "C"), theme: "pace" },
  { id: "Q18", prompt: "I can persuade stakeholders who initially disagree.", format: "likert", options: [...likertOptions], scoring: mixed("I", "D"), theme: "persuasion" },
  { id: "Q19", prompt: "I focus on team cohesion during difficult changes.", format: "likert", options: [...likertOptions], scoring: mixed("S", "I"), theme: "change response" },
  { id: "Q20", prompt: "I escalate issues early rather than waiting.", format: "likert", options: [...likertOptions], scoring: mixed("D", "C"), theme: "follow-through" },
  { id: "Q21", prompt: "I delegate outcomes clearly and trust others to execute.", format: "likert", options: [...likertOptions], scoring: mixed("D", "S"), theme: "delegation" },
  { id: "Q22", prompt: "I bring optimism to uncertain situations.", format: "likert", options: [...likertOptions], scoring: positive("I"), theme: "change response" },
  { id: "Q23", prompt: "I maintain routines that keep the team grounded.", format: "likert", options: [...likertOptions], scoring: positive("S"), theme: "pace" },
  { id: "Q24", prompt: "I refine plans to reduce execution errors.", format: "likert", options: [...likertOptions], scoring: positive("C"), theme: "planning" },
  { id: "Q25", prompt: "I am comfortable making unpopular calls when needed.", format: "likert", options: [...likertOptions], scoring: positive("D"), theme: "conflict" },
  { id: "Q26", prompt: "I use storytelling to align people around a goal.", format: "likert", options: [...likertOptions], scoring: positive("I"), theme: "communication" },
  { id: "Q27", prompt: "I build trust by being patient and reliable.", format: "likert", options: [...likertOptions], scoring: positive("S"), theme: "follow-through" },
  { id: "Q28", prompt: "I ask detailed questions before committing resources.", format: "likert", options: [...likertOptions], scoring: positive("C"), theme: "decision making" },
  { id: "Q29", prompt: "I push for progress when meetings drift off topic.", format: "likert", options: [...likertOptions], scoring: mixed("D", "C"), theme: "meeting management" },
  { id: "Q30", prompt: "I naturally network across teams to remove blockers.", format: "likert", options: [...likertOptions], scoring: mixed("I", "D"), theme: "persuasion" },
  { id: "Q31", prompt: "I coach people through conflict with empathy.", format: "likert", options: [...likertOptions], scoring: mixed("S", "I"), theme: "conflict" },
  { id: "Q32", prompt: "I document expectations to improve accountability.", format: "likert", options: [...likertOptions], scoring: mixed("C", "S"), theme: "delegation" }
];
