module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: { accent: "#11b789" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
