const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 15s linear infinite',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        carter: ['Carter One', 'sans-serif'],
        raj: ['Rajdhani', 'sans-serif'],
      }
    }
  },
  plugins: []
};
