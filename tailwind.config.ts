import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#1D3640",
        secondary: "#3D4F4F",
        tertiary: "#A3A692",
        accent: {
          primary: "#E9B893",
          secondary: "#F99D7C",
        },
        blue: {
          400: "#E9B893",
          500: "#F99D7C",
          600: "#E9B893",
          900: "#1D3640",
        },
        purple: {
          400: "#F99D7C",
          500: "#E9B893",
          600: "#F99D7C",
          900: "#3D4F4F",
        },
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        marquee: "marquee var(--marquee-duration) linear infinite",
        "fade-in": "fade-in 0.5s linear forwards",
        first: "first 10s infinite",
        second: "second 12s infinite",
        third: "third 15s infinite",
        fourth: "fourth 18s infinite",
        fifth: "fifth 20s infinite"
      },
      boxShadow: {
        derek: `0px 0px 0px 1px rgb(0 0 0 / 0.06),
        0px 1px 1px -0.5px rgb(0 0 0 / 0.06),
        0px 3px 3px -1.5px rgb(0 0 0 / 0.06), 
        0px 6px 6px -3px rgb(0 0 0 / 0.06),
        0px 12px 12px -6px rgb(0 0 0 / 0.06),
        0px 24px 24px -12px rgb(0 0 0 / 0.06)`,
        aceternity: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        marquee: {
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        "fade-in": {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        first: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.2)" },
          "100%": { transform: "rotate(360deg) scale(1)" }
        },
        second: {
          "0%": { transform: "rotate(0deg) scale(1.2)" },
          "50%": { transform: "rotate(-180deg) scale(0.8)" },
          "100%": { transform: "rotate(-360deg) scale(1.2)" }
        },
        third: {
          "0%": { transform: "rotate(0deg) scale(0.8)" },
          "50%": { transform: "rotate(180deg) scale(1.2)" },
          "100%": { transform: "rotate(360deg) scale(0.8)" }
        },
        fourth: {
          "0%": { transform: "rotate(0deg) scale(1.2)" },
          "50%": { transform: "rotate(-180deg) scale(0.8)" },
          "100%": { transform: "rotate(-360deg) scale(1.2)" }
        },
        fifth: {
          "0%": { transform: "rotate(0deg) scale(0.8)" },
          "50%": { transform: "rotate(180deg) scale(1.2)" },
          "100%": { transform: "rotate(360deg) scale(0.8)" }
        }
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
};

export default config;
