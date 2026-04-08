import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "var(--primary-color)",
          800: "var(--primary-color-800)",
        },
        secondary: {
          50: "var(--secondary-color-50)",
          900: "var(--secondary-color-900)",
        },
        tint: {
          400: "var(--tint-color-400)",
        },
        accent: {
          800: "var(--accent-color-800)",
        },
      },
      fontSize: {
        xs: ["var(--fs-xs)", { lineHeight: "1rem" }],
        sm: ["var(--fs-sm)", { lineHeight: "1.25rem" }],
        base: ["var(--fs-base)", { lineHeight: "1.5rem" }],
        lg: ["var(--fs-lg)", { lineHeight: "1.75rem" }],
        xl: ["var(--fs-xl)", { lineHeight: "1.75rem" }],
        "2xl": ["var(--fs-2xl)", { lineHeight: "2rem" }],
        "3xl": ["var(--fs-3xl)", { lineHeight: "2.25rem" }],
        "4xl": ["var(--fs-4xl)", { lineHeight: "2.5rem" }],
      },
      screens: {
      xs: "480px",
      sm: "640px",
      md: "750px", 
      lg: "1024px",
      xl: "1280px",
    },
    },
  },
  plugins: [
  require('tailwind-scrollbar'),
],

};

export default config;
