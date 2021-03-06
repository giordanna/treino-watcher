module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fcfbf9',
          100: '#fbf0e0',
          200: '#f7d4c0',
          300: '#eba990',
          400: '#e27a61',
          500: '#d1573f',
          600: '#b63d2a', // aqui
          700: '#8f2d20',
          800: '#651f17',
          900: '#3f140e',
        },
        /*
         primary: {
          50: '#f7fafb',
          100: '#e6f0fc',
          200: '#cbd8fa',
          300: '#a5b4f3',
          400: '#848be9',
          500: '#6c66e2',
          600: '#5d43c5', // aqui
          700: '#4337b3',
          800: '#2e2684',
          900: '#191852',
        },
         */
        secondary: {
          50: '#fcfcfb',
          100: '#faeff4',
          200: '#f5cce9',
          300: '#eaa0d0',
          400: '#e771b3',
          500: '#c543a8', // aqui
          600: '#c33379',
          700: '#9c2659',
          800: '#711b3a',
          900: '#44121f',
        },
        tertiary: {
          50: '#f2f7f8',
          100: '#d7f0f9',
          200: '#aae2f1',
          300: '#75c4de',
          400: '#439ec5', // aqui
          500: '#2d83aa',
          600: '#266991',
          700: '#214f71',
          800: '#183651',
          900: '#0f2137',
        },
        gray: {
          50: '#f9f9f8',
          100: '#f0f0f1',
          200: '#dddde0',
          300: '#bababe',
          400: '#8a8a8a', // aqui
          500: '#727071',
          600: '#5b5555',
          700: '#464041',
          800: '#302b2d',
          900: '#1d1b1d',
        },
        danger: {
          50: '#fdfcfa',
          100: '#fbf0e9',
          200: '#f7d0d3',
          300: '#eda4aa',
          400: '#de6d6d', //aqui
          500: '#da515d',
          600: '#c23740',
          700: '#9b2930',
          800: '#6f1d20',
          900: '#451212',
        },
        warning: {
          50: '#fbfaf4',
          100: '#f9efbe',
          200: '#f2dc84',
          300: '#ddb752',
          400: '#da8a2a', // aqui
          500: '#a46d16',
          600: '#86530e',
          700: '#663e0d',
          800: '#462b0b',
          900: '#2e1a08',
        },
        success: {
          50: '#eff5f1',
          100: '#d5efe7',
          200: '#a2e7c9',
          300: '#6dde8d', // aqui
          400: '#25b167',
          500: '#199840',
          600: '#17822e',
          700: '#166527',
          800: '#114520',
          900: '#0c2b1a',
        },
        background: {
          50: '#f9f9f6',
          100: '#f2eee5',
          200: '#f2f4dc', // aqui
          300: '#c3b89b',
          400: '#9a916f',
          500: '#7d714b',
          600: '#655735',
          700: '#4f422b',
          800: '#362e20',
          900: '#231d16',
        },
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ['hover, group-hover'],
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
