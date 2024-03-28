module.exports = {
  extends: ['@utils/eslint-config'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  rules: {
    // optional overrides
    "@typescript-eslint/no-var-requires": "off"

  },
  overrides: [
    // optional overrides
  ],
  
};
 