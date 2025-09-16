import typeScriptParser from '@typescript-eslint/parser';
import baseConfig from '@utils/eslint-config';

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
  },
];

export default config;
