module.exports = {
  mode: 'jit',
  purge: [
    './index.html', './src/**/*.{js,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#24282b',
        orange: '#EEAF0C'
      },
      screens: {
        'portrait': {'raw': '(orientation: portrait)'},
        'landscape': {'raw': '(orientation: landscape)'},
      },
      fontFamily: {
        sigmar: ['Sigmar One'],
        pacifico: ['Pacifico'],
        pressstart: ["'Press Start 2P'"], // doesn't work without quotes for some reason
      },
      boxShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
      },
      gridTemplateColumns: {
        'ohoho': 'minmax(auto, 1fr) 1fr',
        'muahaha': '1fr auto 1fr',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
