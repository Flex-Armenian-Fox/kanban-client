module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito'],
      },
      maxHeight: (theme) => ({
        ...theme('spacing'),
        full: '100%',
        screen: '87vh',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
