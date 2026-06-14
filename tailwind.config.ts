import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        cream: "#F8F4EA",
        dark: "#111111"
      }
    }
  },
  plugins: []
};

export default config;
