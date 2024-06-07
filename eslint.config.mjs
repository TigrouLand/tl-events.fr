import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue', '*.mjs'],
    plugins: { prettier: { rules: { 'prettier/prettier': ['error'] } } },
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
]);
