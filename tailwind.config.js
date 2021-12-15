const plugin = require('tailwindcss/plugin')
const addHeaders = require('./tailwind/headers')
const addLayouts = require('./tailwind/layouts')

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

// Read more about tailwindcss configuration: https://tailwindcss.com/docs/configuration
module.exports = {
  mode: 'jit',
  prefix: 'tw-',
  theme: {
    // structure
    fontSize: {
      '2xs': '.675rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'normal': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3.5rem',
      'unset': 'unset',
      'inherit': 'inherit',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
    },
    gridTemplateColumns: {
      cards: 'repeat(auto-fill, minmax(14rem, 1fr))',
    },
    colors: {
      black: co('--c-black'),
      dark: co('--c-dark'),
      white: co('--c-white'),
      light: co('--c-light'),

      accent: {
        DEFAULT: co('--c-accent'),
        brighter: co('--c-accent-brighter'),
      },
    },
    fontFamily: {
      header: ['Mulish', ...sansSerif],
      sans: ['Roboto', ...sansSerif],
    },
    lineHeight: {
      none: 1,
      xs: 1.1,
      sm: 1.15,
    },
    // skins
    textColor: theme => ({
      ...theme('colors'),
      base: co('--c-color-base'),
      dim: {
        1: co('--c-color-dim-1'),
        2: co('--c-color-dim-2'),
        3: co('--c-color-dim-3'),
      },
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      'base': co('--c-bg-base'),
      'dim': {
        1: co('--c-bg-dim-1'),
      },
      'theme-switcher': {
        DEFAULT: co('--c-theme-switcher-bg'),
        hover: co('--c-theme-switcher-bg-hover'),
      },
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'theme-switcher': {
        DEFAULT: co('--c-theme-switcher-border'),
        hover: co('--c-theme-switcher-border-hover'),
      },
      'nav': co('--c-nav-border'),
    }),
    fill: {
      base: co('--c-color-base'),
    },
    opacity: {
      0: 0,
      100: 1,
    },
    backgroundOpacity: {
      nav: 'var(--o-nav)',
    },
    boxShadow: {
      card: 'var(--s-card)',
    },
    dropShadow: {
      title: 'var(--s-title)',
    },
    extend: {
      screens: {
        '2xs': '320px',
        'xs': '400px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    plugin(addHeaders),
    plugin(addLayouts),
    ({ addUtilities, addComponents, theme }) => {
      addUtilities({
        '.b': {
          borderWidth: theme('borderWidth.DEFAULT'),
          borderStyle: 'solid',
        },
      })
      addComponents({
        '.link': {
          'color': theme('colors.accent.DEFAULT'),
          'fontWeight': theme('fontWeight.medium'),
          'transitionDuration': theme('transitionDuration.300'),
          '&:hover': {
            color: theme('colors.accent.brighter'),
            transitionDuration: theme('transitionDuration.150'),
          },
        },
      })
    },
  ],
}
