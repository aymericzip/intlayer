import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import typeScriptParser from '@typescript-eslint/parser';
import baseConfig from '@utils/eslint-config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...baseConfig,
  {
    languageOptions: {
      parser: typeScriptParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
    },
    rules: {
      // optional overrides
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];

export default config;
