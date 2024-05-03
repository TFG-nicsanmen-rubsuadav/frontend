/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-green": "#026352",
        "primary-green-hover": "#047D68",
        "primary-green-active": "#06977E",
        "primary-yellow": "#FADD41",
        "gray-custom": "#7e7e7e",
        "bg-custom": "#e9e9e9",
      },
    },
  },
  plugins: [],
};
