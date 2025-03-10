const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
const svgToDataUri = require('mini-svg-data-uri');
const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-bg': '#0056FE',
        'basement-cyan': '#00fff7',
        'black-tr': 'rgba(0, 0, 0, 0.95)',
        accent: colors.cyan,
        'clr-1': 'var(--clr-1)',
        'clr-2': 'var(--clr-2)',
        'clr-3': 'var(--clr-3)',
        'clr-4': 'var(--clr-4)',
        'clr-5': 'var(--clr-5)',
        'the-blues': {
          50: '#e6f1fe',
          100: '#cce3fd',
          200: '#99c7fb',
          300: '#66aaf9',
          400: '#338ef7',
          500: '#006FEE',
          600: '#005bc4',
          700: '#004493',
          800: '#002e62',
          900: '#001731',
        },
        'electric-rainbow': {
          blue: '#037CFE',
          cyan: '#00FFE0',
          yellow: '#FFF903',
          green: '#94EC0E',
          pink: '#FA0098',
        },
        danger: '#f31260',
        success: '#45d483',
        warning: '#f7b750',
        info: '#0000ff',
        secondary: '#9353d3',
        primary: '#00ff6a',
        default: '#3f3f46',
        focus: '#006FEE',
        background: '#000000',
        foreground: '#ECEDEE',
      },
      animation: {
        marquee: 'marquee var(--duration, 30s) linear infinite',
      },
      keyframes: {
        marquee: {
          to: { transform: 'translateX(-50%)' },
        },
      },
      fontFamily: {
        basement: ['Basement Grotesque', 'sans-serif'],
        belgro: ['Belgro', 'sans-serif'],
        aeonik: ['Aeonik', 'sans-serif'],
      },
    },
    darkMode: 'class',
  },
  plugins: [
    nextui(),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-grid': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="${value}" fill="none"><path d="M64 0H0V64"/></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme('backgroundColor')),
          type: ['color'],
        },
      );

      matchUtilities(
        {
          'bg-grid': (value) => ({
            backgroundSize: value,
          }),
        },
        {
          values: theme('spacing'),
          type: ['number', 'length', 'any'],
        },
      );
    }),
  ],
};