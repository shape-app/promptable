const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderWidth: {
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        '070707': '#070707',
      },
      borderColor: {
        '070707': '#070707',
      },
      width: {
        '40%': '40%',
        '55%': '55%',
        '60%': '60%',
        '70%': '70%',
        '80%': '80%',
      },
      height: {
        '80%': '80%',
        header: '3rem',
        navigator: '12vh',
        workspace: '88vh',
        '70vh': '70vh',
        '75vh': '75vh',
        rest: 'calc(100vh - 3rem - 2.5rem - 5rem)',
      },
      minHeight: {
        '15vh': '15vh',
        '12vh': '12vh',
      },
      margin: {
        '1/4': '25%',
      },
      spacing: {
        '1/1': '100%',
      },
      outlineWidth: {
        3: '3px',
      },
      outlineColor: {
        gray: colors.gray,
      },
    },
    plugins: [],
  },
}
