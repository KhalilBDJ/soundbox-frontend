/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anonymous: ['"Anonymous Pro"', 'monospace'],
      },
      backgroundImage: {
        'custom-bg': "url('./assets/images/background.jpg')",
      },
    },
  },
  plugins: [],
};


