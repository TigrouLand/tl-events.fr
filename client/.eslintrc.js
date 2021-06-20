module.exports = {
  root: true,
  ignorePatterns: ['.nuxt/*', '**/sw.js'],
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    semi: ['error', 'always'],
    'space-before-function-paren': 'off',
    curly: 'off',
    'no-console': 'off'
  }
};
