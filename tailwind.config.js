/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  // Safelist dynamic classes that might be generated at runtime
  safelist: [
    // Dynamic position tag colors
    "bg-blue-200",
    "text-blue-800",
    "bg-purple-200",
    "text-purple-800",
    "bg-pink-200",
    "text-pink-800",
    "bg-indigo-200",
    "text-indigo-800",
    "bg-teal-200",
    "text-teal-800",
    "bg-cyan-200",
    "text-cyan-800",
    "bg-rose-200",
    "text-rose-800",
    "bg-amber-200",
    "text-amber-800",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        // KU Job Fair color palette (Original)
        "ku-navy": "#1E3A8A",
        "ku-blue": "#1E40AF",
        "ku-gold": "#F59E0B",
        "ku-amber": "#FBBF24",
        "ku-light": "#F9FAFB",
        "ku-dark": "#111827",
        // KU 80th Anniversary Brand Colors
        "ku-pine": "#1B5E5E", // KU Pine Green (teal)
        "ku-fresh": "#A4B82E", // KU Fresh Green (lime)
        "ku-pine-dark": "#0F3D3D", // Darker pine for hover states
        "ku-fresh-dark": "#7A8A1F", // Darker fresh for hover states
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
      },
      spacing: {
        128: "32rem",
      },
      boxShadow: {
        "ku-sm": "0 1px 2px 0 rgba(30, 58, 138, 0.05)",
        "ku-md": "0 4px 6px -1px rgba(30, 58, 138, 0.1)",
        "ku-lg": "0 10px 15px -3px rgba(30, 58, 138, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
  // Production optimizations
  future: {
    hoverOnlyWhenSupported: true,
  },
};
