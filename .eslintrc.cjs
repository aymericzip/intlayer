module.exports = {
  root: true,
  extends: ['@utils/eslint-config'],
  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },

  rules: {
    // optional overrides
  },
  overrides: [
    // optional overrides
  ],
  ignorePatterns: ['**/intlayer.d.ts'],
};
