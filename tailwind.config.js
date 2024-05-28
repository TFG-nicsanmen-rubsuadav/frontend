/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-green": "#026352",
        "primary-yellow": "#FADD41",
        "gray-custom": "#7e7e7e",
        "bg-custom": "#e9e9e9",
        "green-button": "#034e41",
        "hover-button": "#0e977e",
        "active-button": "#0EC8A8",
        "gray-background": "#d9d9d9",
        "gray-label": "#e7e7e7",
      },
      variants: {
        backgroundColor: ["responsive", "hover", "focus", "active"],
      },
      scrollbarHide: {
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      },
    },
  },
  plugins: [],
};
