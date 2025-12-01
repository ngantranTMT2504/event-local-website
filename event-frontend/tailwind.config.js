/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#ffffff",
          dark: "#0a0a0a",
        },
        foreground: {
          DEFAULT: "#0a0a0a",
          dark: "#f9fafb",
        },
        primary: {
          DEFAULT: "#ef4444", 
          dark: "#f87171", 
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f3f4f6",
          dark: "#1f2937",
          foreground: "#ef4444",
        },
        muted: {
          DEFAULT: "#f3f4f6",
          dark: "#374151",
          foreground: "#6b7280",
        },
        border: "#e5e7eb",
        ring: "#fca5a5",
      },
    },
  },
  plugins: [],
};
