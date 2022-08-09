/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,jsx}', '../public/*.html'],
  theme: {
    extend: {
      fontFamily: {
        BaiJamjuree: ['Bai Jamjuree', 'sans-serif'],
      },
      backgroundImage: {
        'hero-background': 'url(./assets/images/bg.png)',
      },
    },
  },
  plugins: [],
};
