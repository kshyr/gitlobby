/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-in-1': 'slide-in-left 1.4s ease-out',
        'slide-in-2': 'slide-in-left 1.3s ease-out',
        'slide-in-3': 'slide-in-left 0.9s ease-out',
        'slide-in-4': 'slide-in-right 1.5s ease-out',
        'slide-in-5': 'slide-in-right 1.8s ease-out',      
      },
      keyframes: {
        'slide-in-left': {
          "0%": { transform: "translateX(-400%)", borderColor: "#ffffff00", opacity: 0 },
          "80%": { transform: "translateX(0)", borderColor: "#ffffff00", opacity: 1 },
          "100%": { transform: "translateX(0)", borderColor: "#ffffff33", opacity: 1 },
        },
        'slide-in-right': {
          "0%": { transform: "translateX(200%)", borderColor: "#ffffff00", opacity: 0 },
          "80%": { transform: "translateX(0)", borderColor: "#ffffff00", opacity: 0 },
          "100%": { transform: "translateX(0)", borderColor: "#ffffff33", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
