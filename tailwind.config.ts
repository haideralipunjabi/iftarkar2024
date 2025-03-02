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
        primary: "#131836",
        secondary: "#311b92",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        robotomono: ["var(--font-roboto-mono)"],
        amiri: ["var(--font-amiri)"],
      },
    },
  },
  plugins: [],
};
export default config;
