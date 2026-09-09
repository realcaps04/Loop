import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F8FAFC",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#0F172A",
          secondary: "#334155",
          muted: "#64748B",
          faint: "#94A3B8",
        },
        line: {
          DEFAULT: "#E2E8F0",
          subtle: "#F1F5F9",
        },
        accent: {
          DEFAULT: "#494AFD",
          hover: "#3B3CE8",
          pressed: "#2F32D4",
          soft: "#EEF0FF",
          muted: "#7B7DFD",
        },
        indigo: {
          50: "#EEF0FF",
          100: "#E0E2FF",
          200: "#C7C9FE",
          300: "#A5A7FD",
          400: "#7B7DFD",
          500: "#494AFD",
          600: "#494AFD",
          700: "#3B3CE8",
          800: "#2F32D4",
          900: "#2527A8",
          950: "#1B1D7A",
        },
        wash: {
          lavender: "#EDE9FE",
          sky: "#E0F2FE",
          mist: "#F8FAFF",
        },
        navy: "#0F172A",
        sentiment: {
          positive: "#0F766E",
          "positive-soft": "#ECFDF5",
          negative: "#C2410C",
          "negative-soft": "#FFF7ED",
          mixed: "#A16207",
          "mixed-soft": "#FFFBEB",
          neutral: "#57534E",
          "neutral-soft": "#F5F5F4",
        },
        status: {
          new: "#494AFD",
          "new-soft": "#EEF0FF",
          reviewed: "#57534E",
          "reviewed-soft": "#F5F5F4",
          actioned: "#0F766E",
          "actioned-soft": "#ECFDF5",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "var(--font-sans)",
          "system-ui",
          "sans-serif",
        ],
        hand: ["var(--font-hand)", "cursive"],
        brand: ["var(--font-brand)", "var(--font-display)", "sans-serif"],
      },
      fontSize: {
        "display-hero": [
          "3.25rem",
          { lineHeight: "1.08", letterSpacing: "-0.04em" },
        ],
        "display-lg": ["2rem", { lineHeight: "2.4rem", letterSpacing: "-0.03em" }],
        "display-md": [
          "1.5rem",
          { lineHeight: "1.9rem", letterSpacing: "-0.025em" },
        ],
        "display-sm": [
          "1.25rem",
          { lineHeight: "1.65rem", letterSpacing: "-0.02em" },
        ],
      },
      boxShadow: {
        loop: "0 1px 2px rgba(28, 25, 23, 0.04), 0 8px 24px rgba(28, 25, 23, 0.05)",
        "loop-lg":
          "0 1px 2px rgba(73, 74, 253, 0.06), 0 24px 60px rgba(73, 74, 253, 0.12)",
        "loop-glow": "0 0 0 8px rgba(73, 74, 253, 0.12)",
        "loop-sm": "0 1px 2px rgba(28, 25, 23, 0.05)",
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
      },
      maxWidth: {
        content: "76rem",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.98) translateY(4px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "play-ping": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(1.85)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 180ms ease-out",
        "rise-in": "rise-in 280ms cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scale-in 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-right": "slide-in-right 280ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-left": "slide-in-left 280ms cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 1.4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 1.6s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "play-ping": "play-ping 2s cubic-bezier(0.22, 1, 0.36, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
