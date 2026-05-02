/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': ['14px', '20px'],
        'sm': ['16px', '24px'],
        'base': ['18px', '28px'],
        'lg': ['20px', '30px'],
        'xl': ['24px', '36px'],
        '2xl': ['28px', '40px'],
        '3xl': ['32px', '44px'],
        '4xl': ['36px', '48px'],
        '5xl': ['44px', '56px'],
      }
    },
  },
  plugins: [],
}

