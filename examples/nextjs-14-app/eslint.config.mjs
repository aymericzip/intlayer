import baseConfig from '@utils/eslint-config';
import typeScriptParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...baseConfig,
  {
    languageOptions: {
      parser: typeScriptParser,
    },
    rules: {
      // optional overrides
    },

    ignores: ['**/intlayer.d.ts'],
  },
];

export default config;
