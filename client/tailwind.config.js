/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-120deg)", scale: "1" },
          "50%": { transform: "rotate(360deg)", scale: "0.5" },
        },
      },
      animation: {
        wiggle: "wiggle 3s linear infinite",
      },
    },
  },
  plugins: [],
};
