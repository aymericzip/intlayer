module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['@utils/eslint-config'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['react-refresh'],
};
