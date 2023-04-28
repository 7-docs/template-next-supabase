/** @type {import('tailwindcss').Config} */

const darkerGray = '#1b1b1b';
const darkGray = '#333';
const gray = '#888';
const offWhite = '#faf9f6';

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'darker-gray': darkerGray,
        'dark-gray': darkGray,
        gray: gray,
        'off-white': offWhite,
        white: '#fff'
      }
    }
  },
  plugins: []
};
