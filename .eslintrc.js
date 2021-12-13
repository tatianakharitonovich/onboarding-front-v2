module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    '@antfu/eslint-config',
  ],
  plugins: [
  ],
  rules: {
    'brace-style': ['error', '1tbs'],
    'curly': ['error', 'all'],
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
  },
}
