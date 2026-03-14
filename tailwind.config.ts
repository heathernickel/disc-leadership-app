import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f5ff",
          500: "#3b5bdb",
          600: "#2f4bcc",
          700: "#253da6"
        },
        disc: {
          d: "#ef4444",
          i: "#f59e0b",
          s: "#10b981",
          c: "#3b82f6"
        }
      }
    }
  },
  plugins: []
};

export default config;
