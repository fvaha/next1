/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/pages/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/data/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      /* ---------- Typography ---------- */
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          ...defaultTheme.fontFamily.sans, // keeps OS fallbacks
        ],
      },

      /* ---------- Colour palette ---------- */
      colors: {
        gold: "#D4AF37",       // primary TerraCrypt gold
        "gold-dark": "#a88c27" // muted gold for hover/active
        // tailwind automatically generates `border-gold`, `text-gold`, etc.
      },

      /* ---------- Focus ring in gold ---------- */
      outlineColor: {
        gold: "#D4AF37",
      },
    },
  },

  plugins: [],
};
