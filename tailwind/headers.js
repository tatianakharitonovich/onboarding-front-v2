module.exports = ({ addBase, theme, addUtilities }) => {
  const headerStyles = {
    fontFamily: theme('fontFamily.display'),
    fontWeight: theme('fontWeight.bold'),
    lineHeight: theme('lineHeight.sm'),
  }
  const headerStylesStrong = {
    fontFamily: theme('fontFamily.display'),
    fontWeight: theme('fontWeight.black'),
    lineHeight: theme('lineHeight.none'),
    dropShadow: theme('dropShadow.title'),
  }
  const headers = {
    h1: {
      ...headerStylesStrong,
      fontSize: theme('fontSize.5xl'),
    },
    h2: {
      ...headerStylesStrong,
      fontSize: theme('fontSize.4xl'),
    },
    h3: {
      ...headerStylesStrong,
      fontSize: theme('fontSize.3xl'),
    },
    h4: {
      ...headerStyles,
      fontSize: theme('fontSize.2xl'),
    },
    h5: {
      ...headerStyles,
      fontSize: theme('fontSize.xl'),
    },
    h6: {
      ...headerStyles,
      fontSize: theme('fontSize.base'),
    },
  }
  // bind styles to tags
  addBase(headers)
  // create .h# utils (e.g. `tw-h6` etc)
  addUtilities(Object.entries(headers).reduce((utils, [tag, styles]) => ({
    ...utils,
    [`.${tag}`]: styles,
  }), {}))
}
