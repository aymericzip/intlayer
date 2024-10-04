import baseConfig from '@utils/eslint-config';
import typeScriptParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
