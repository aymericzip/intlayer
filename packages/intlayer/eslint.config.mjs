import path from 'path';
import { fileURLToPath } from 'url';
import typeScriptParser from '@typescript-eslint/parser';
import baseConfig from '@utils/eslint-config';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

/** @type {import('eslint').Linter.Config[]} */
const config = [
  baseConfig,
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
