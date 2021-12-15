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
  plugins: [],
  rules: {
    'camelcase': 'off',
    'import/named': 'off',
    'no-useless-constructor': 'off',
    'no-control-regex': 'off',
    'no-console': 'warn',
    'brace-style': ['error', '1tbs'],
    'curly': ['error', 'all'],
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
    'vue/no-v-model-argument': 'off',
  },
}
