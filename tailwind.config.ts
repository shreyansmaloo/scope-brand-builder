import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      fontSize: {
        // Base Tailwind scale, shifted up exactly +2px (0.125rem @ 16px root)
        // across the board so the whole site reads larger while preserving
        // each step's relative line-height ratio (and therefore the existing
        // size hierarchy). This is the single place to adjust sitewide type
        // size going forward — rem is used (not px) so text still respects
        // a visitor's browser/OS text-size accessibility setting. Each line
        // has its px-equivalent in a trailing comment (@ 16px root) so you
        // can edit by pixel without doing the math yourself.
        xs: ["0.875rem", { lineHeight: "1.333" }], // 14px
        sm: ["1rem", { lineHeight: "1.429" }], // 16px
        base: ["1.125rem", { lineHeight: "1.5" }], // 18px
        lg: ["1.25rem", { lineHeight: "1.556" }], // 20px
        xl: ["1.375rem", { lineHeight: "1.4" }], // 22px
        "2xl": ["1.625rem", { lineHeight: "1.333" }], // 26px
        "3xl": ["2rem", { lineHeight: "1.2" }], // 32px
        "4xl": ["2.375rem", { lineHeight: "1.111" }], // 38px
        "5xl": ["3.125rem", { lineHeight: "1" }], // 50px
        "6xl": ["3.875rem", { lineHeight: "1" }], // 62px
        hero: ["clamp(2.625rem, 5vw, 4.625rem)", { lineHeight: "1.1" }], // 42px → 74px
        h1: ["clamp(2.125rem, 4vw, 3.375rem)", { lineHeight: "1.1" }], // 34px → 54px
        h2: ["clamp(1.625rem, 3vw, 2.375rem)", { lineHeight: "1.2" }], // 26px → 38px
        h3: ["clamp(1.25rem, 2vw, 1.625rem)", { lineHeight: "1.3" }], // 20px → 26px
      },
      colors: {
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        heading: "rgb(var(--heading) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
          light: "rgb(var(--primary-light) / <alpha-value>)",
          muted: "rgb(var(--primary-muted) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
        "surface-dark": {
          DEFAULT: "rgb(var(--surface-dark) / <alpha-value>)",
          foreground: "rgb(var(--surface-dark-foreground) / <alpha-value>)",
          muted: "rgb(var(--surface-dark-muted) / <alpha-value>)",
        },
        sidebar: {
          DEFAULT: "rgb(var(--sidebar-background) / <alpha-value>)",
          foreground: "rgb(var(--sidebar-foreground) / <alpha-value>)",
          primary: "rgb(var(--sidebar-primary) / <alpha-value>)",
          "primary-foreground": "rgb(var(--sidebar-primary-foreground) / <alpha-value>)",
          accent: "rgb(var(--sidebar-accent) / <alpha-value>)",
          "accent-foreground": "rgb(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "rgb(var(--sidebar-border) / <alpha-value>)",
          ring: "rgb(var(--sidebar-ring) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
