export type DiscStyle = "D" | "I" | "S" | "C";

export type ScoringMap = Partial<Record<DiscStyle, number>>;

export type LikertOption = {
  label: string;
  value: number;
};

export type DiscQuestion = {
  id: string;
  prompt: string;
  format: "likert";
  options: LikertOption[];
  scoring: Record<number, ScoringMap>;
  theme: string;
};

export type StyleNarrative = {
  style: DiscStyle;
  title: string;
  overview: string;
  coreMotivators: string[];
  strengths: string[];
  blindSpots: string[];
  communicationStyle: string;
  underStress: string;
  leadershipTips: string[];
  delegationTips: string[];
  meetingStyle: string;
  conflictStyle: string;
  decisionStyle: string;
  teamExperience: string;
  growthEdge: string;
  oppositeStylePartnership: string;
  bestFitResponsibilities: string[];
};

export type DiscResult = {
  dScore: number;
  iScore: number;
  sScore: number;
  cScore: number;
  primaryStyle: DiscStyle;
  secondaryStyle: DiscStyle;
  blendLabel: string;
  narrative: {
    primary: StyleNarrative;
    blendIntro: string;
  };
};
