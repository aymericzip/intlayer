import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const baseConfig = {
  ignores: ['**/dist', '**/.eslintrc.cjs'],
};

const extendedConfigs = compat.extends(
  '@utils/eslint-config',
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:react-hooks/recommended'
);

const reactRefreshConfig = {
  plugins: {
    'react-refresh': reactRefresh,
  },

  languageOptions: {
    globals: {
      ...globals.browser,
    },

    parser: tsParser,
  },

  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
      },
    ],
  },
};

/** @type {import('eslint').Linter.Config[]} */
const config = [baseConfig, ...extendedConfigs, reactRefreshConfig];

export default config;
