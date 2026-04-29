import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#070b14",
        surface: "rgba(20, 27, 46, 0.55)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(79, 70, 229, 0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(34, 211, 238, 0)" },
          "50%": { boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)" },
        },
        modalIn: {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.2s ease-in-out infinite",
        "modal-in": "modalIn 240ms ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
