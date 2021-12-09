module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  whitelist: ['bg-white', 'bg-transparent', 'opacity-0', 'opacity-100', 'transition-all'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ["group-hover"]
    },
  },
  plugins: [],
}
