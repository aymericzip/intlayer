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
    'prettier-plugin-packagejson',
    'prettier-plugin-tailwindcss',
    // 'prettier-plugin-organize-imports'
  ],
};
