/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*/*.html', './src/**/*.{ts,tsx}'],
  plugins: [],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        lightGray: 'hsl(0, 0%, 98%)',
        lightGrayishBlue: {
          DEFAULT: 'hsl(233, 11%, 84%)',
          hover: 'hsl(236, 33%, 92%)',
        },
        darkGrayishBlue: 'hsl(236, 9%, 61%)',
        veryDarkGrayishBlue: 'hsl(235, 19%, 35%)',
        veryDarkBlue: 'hsl(235, 21%, 11%)',
        veryDarkDesaturatedBlue: 'hsl(235, 24%, 19%)',
        lightBlue: 'hsl(192, 100%, 67%)',
        pink: 'hsl(280, 87%, 65%)',
      },
      fontFamily: {
        JosefinSans: ['"Josefin Sans"'],
      },
    },
  },
}
