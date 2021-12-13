const plugin = require('tailwindcss/plugin')
const addHeaders = require('./tailwind/headers')

function c(color, opacityValue) {
  return opacityValue === undefined
    ? `rgb(var(${color}))`
    : `rgba(var(${color}), ${opacityValue})`
}

// return color with concomitant opacity
function co(color) {
  return ({ opacityValue }) => c(color, opacityValue)
}

const sansSerif = [
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  '"Noto Sans"',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
]

module.exports = {
  mode: 'jit',
  prefix: 'tw-',
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    plugin(addHeaders),
  ],
  theme: {
    // structure
    fontSize: {
      '2xs': '.675rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3.5rem',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
    },
    colors: {
      black: co('--c-black'),
      white: co('--c-white'),

      gray: Array(11).reduce((obj, _, index) => {
        return {
          ...obj,
          [index]: co(`--c-gray-${index}`),
        }
      }, {}),

      accent: co('--c-accent'),
    },
    fontFamily: {
      header: ['Raleway', ...sansSerif],
      sans: ['Roboto', ...sansSerif],
    },
    lineHeight: {
      none: 1,
      xs: 1.1,
      sm: 1.15,
    },
    // skins
    textColor: {
      base: co('--c-color-base'),
      muted: co('--c-color-muted'),
    },
    backgroundColor: {
      base: co('--c-bg-base'),
      alt: co('--c-bg-alt'),
    },
    fill: {
      contrast: co('--c-color'),
    },
    opacity: {
      0: 0,
      1: 1,
    },
    boxShadow: {
      card: 'var(--s-card)',
    },
    dropShadow: {
      title: 'var(--s-title)',
    },
  },
}
