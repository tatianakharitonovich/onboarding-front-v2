module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
  ],
  ignoreFiles: ['**/*.scss'],
  rules: {
    'declaration-empty-line-before': 'never',
    'rule-empty-line-before': 'never',
    'value-list-max-empty-lines': 1,
    'no-descending-specificity': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'at-rule-empty-line-before': ['always', {
      except: ['inside-block', 'blockless-after-blockless', 'first-nested'],
    }],
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
          'screen',
        ],
      },
    ],
  },
}
