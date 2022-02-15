const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './index.html', './src/**/*.{js,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs': '375px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: '#24282b',
        // orange: 'hsl(43deg 97% 61%)', //#f3ca63
        orange: '#f3ca63',
        tomato: '#E06756'
      },
      screens: {
        'portrait': {'raw': '(orientation: portrait)'},
        'landscape': {'raw': '(orientation: landscape)'},
      },
      fontFamily: {
        sigmar: ['Sigmar One'],
        pacifico: ['Pacifico'],
        roboto: ['Roboto'],
        pressstart: ["'Press Start 2P'"], // doesn't work without quotes for some reason
      },
      boxShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
      },
      gridTemplateColumns: {
        'ohoho': 'minmax(auto, 1fr) 1fr',
        'muahaha': '1fr auto 1fr',
      },
      backgroundImage: {
        'bds': "url('/bds2.png')"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
