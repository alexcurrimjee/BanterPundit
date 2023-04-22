/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme')


module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-helvetica)', ...fontFamily.sans],
      },
      borderWidth: {
        3: '3px',
      },
      colors: {
        text:{
          primary: "var(--color-text-primary)",
          'primary-hover': "var(--color-text-primary-hover)",
          secondary: "var(--color-text-secondary)",
          'secondary-hover': "var(--color-text-secondary-hover)",
        },
        primary: {
          DEFAULT:"var(--color-primary)",
          hover:"var(--color-primary-hover)",
        },
        secondary: {
          DEFAULT:"var(--color-secondary)",
          hover:"var(--color-secondary-hover)",
        },
        background:{
          l1: "var(--color-background-l1)",
          l2: "var(--color-background-l2)",
          l3: "var(--color-background-l3)",
        },
        border:{
          DEFAULT: "var(--color-border-primary)",
          secondary: "var(--color-border-secondary)",
        },
        cta:{
          primary:{
            background:{
              default: "var(--color-cta-primary-background-default)",
              hover: "var(--color-cta-primary-background-hover)",
            },
            text: {
              default: "var(--color-cta-primary-text-default)",
              hover: "var(--color-cta-primary-text-hover)",
            },
            stroke: "var(--color-cta-primary-stroke)"
          },
          secondary:{
            background:{
              default: "var(--color-cta-secondary-background-default)",
              hover: "var(--color-cta-secondary-background-hover)",
            },
            text: {
              default: "var(--color-cta-secondary-text-default)",
              hover: "var(--color-cta-secondary-text-hover)",
            },
            stroke: "var(--color-cta-secondary-stroke)",
          },
        }
      },
      backgroundColor: (theme) => theme("colors.background"),
      textColor: (theme) => theme("colors.text"),
      borderColor: (theme) => theme("colors.border"),
      divideColor: (theme) => theme("colors.border"),
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
