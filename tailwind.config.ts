import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f0ebe3",
        "bg-warm": "#e8e2d8",
        card: "#ffffff",
        "card-hover": "#faf8f5",
        accent: "#16a34a",
        "accent-light": "#dcfce7",
        "accent-dark": "#15803d",
        "accent-muted": "#bbf7d0",
        orange: "#ea580c",
        "orange-light": "#fff7ed",
        ink: "#111827",
        "ink-secondary": "#4b5563",
        "ink-muted": "#9ca3af",
        border: "#d6d0c4",
        "border-light": "#e8e2d8",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)"],
        mono: ["var(--font-roboto-mono)"],
        arabic: ["var(--font-amiri)"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-up-d1": "fade-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.08s forwards",
        "fade-up-d2": "fade-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.16s forwards",
        "fade-up-d3": "fade-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.24s forwards",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
        "card-hover": "0 2px 8px rgba(0,0,0,0.08), 0 8px 28px rgba(0,0,0,0.06)",
        "card-active": "0 0 0 2px rgba(22,163,74,0.2), 0 4px 16px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
