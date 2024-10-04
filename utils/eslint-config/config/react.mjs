import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @type {import('eslint').Linter.Config} */
const subConfig = {
  files: ['**/*.{jsx,tsx}'],

  rules: {
    'react/no-unknown-property': [
      'error',
      {
        ignore: ['css'],
      },
    ],

    'react/no-unescaped-entities': [
      'error',
      {
        forbid: ['>'],
      },
    ],

    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  ...fixupConfigRules(
    compat.extends(
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended'
    )
  ).map((config) => ({
    ...config,
    files: ['**/*.{jsx,tsx}'],
  })),
  subConfig,
];

export default config;
