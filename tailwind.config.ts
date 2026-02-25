import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: "#10B981",
        secondary: "#3B82F6",
        danger: "#EF4444",
        appbg: "#0F172A",
        cardbg: "#1E293B",
        text: "#F8FAFC"
      }
    }
  },
  plugins: []
};

export default config;
