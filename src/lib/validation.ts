import { z } from "zod";

export const assessmentAnswersSchema = z.record(z.string(), z.number().min(1).max(5));

export const saveSubmissionSchema = z.object({
  firstName: z.string().trim().min(1).max(60).optional().or(z.literal("")),
  lastName: z.string().trim().min(1).max(60).optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  answers: assessmentAnswersSchema
});
