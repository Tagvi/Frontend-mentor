module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        main: 'Kumbh Sans, sans-serif',
      },
      textColor: {
        primary: 'hsl(26, 100%, 55%)',
        secondary: 'hsl(219, 9%, 45%)',
        lightGray: 'hsl(220, 14%, 75%)',
      },
      backgroundColor: {
        paleOrange: 'hsl(25, 100%, 94%)',
        gray: 'hsl(223, 64%, 98%)',
        orange: 'hsl(26, 100%, 55%)',
        darkGray: 'hsl(220, 14%, 75%)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
