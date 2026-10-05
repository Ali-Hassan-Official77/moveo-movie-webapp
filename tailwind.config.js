/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0B0E",
          900: "#0F1116",
          800: "#181B22",
          700: "#242833",
          600: "#343A48",
        },
        bone: {
          DEFAULT: "#ECE7DC",
          dim: "#B9B3A4",
          faint: "#7C776B",
        },
        gold: {
          DEFAULT: "#C7A046",
          bright: "#E0BE6C",
          dim: "#8C7331",
        },
        wine: {
          DEFAULT: "#7A2436",
          bright: "#9C3348",
          deep: "#4E1622",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "vignette":
          "radial-gradient(120% 90% at 50% 0%, rgba(0,0,0,0) 0%, rgba(10,11,14,0.55) 65%, rgba(10,11,14,1) 100%)",
        "hero-fade":
          "linear-gradient(to top, #0A0B0E 2%, rgba(10,11,14,0.85) 22%, rgba(10,11,14,0.35) 55%, rgba(10,11,14,0.05) 80%)",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(0,0,0,0.6)",
        gold: "0 0 0 1px rgba(199,160,70,0.5), 0 8px 24px -8px rgba(199,160,70,0.25)",
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
