// @ts-check

/**
 * @type {import('prettier').Config}
 */
module.exports = {
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  bracketSpacing: true,
  trailingComma: 'es5',
  bracketSameLine: false,
  useTabs: false,
  endOfLine: 'lf',
  overrides: [],
  plugins: [
    require.resolve('prettier-plugin-tailwindcss'),
    require.resolve('prettier-plugin-packagejson'),
    require.resolve('prettier-plugin-organize-imports'),
  ],
};
