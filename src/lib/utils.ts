import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const styleColorMap = {
  D: "#ef4444",
  I: "#f59e0b",
  S: "#10b981",
  C: "#3b82f6"
} as const;
