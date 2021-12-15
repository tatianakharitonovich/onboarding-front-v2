module.exports = {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    'declaration-empty-line-before': 'never',
    'no-descending-specificity': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'include',
          'mixin',
          'function',
          'return',
          'for',
          'tailwind',
          'each',
          'use',
          'forward',
          'extend',
          'if',
          'else',
          'layer',
        ],
      },
    ],
  },
}
