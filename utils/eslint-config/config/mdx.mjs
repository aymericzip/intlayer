import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
  files: ['**/*.mdx'],

  rules: {
    '@typescript-eslint/consistent-type-exports': 'off',
  },
};

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...compat
    .extends(
      'plugin:mdx/recommended',
      'plugin:@typescript-eslint/disable-type-checked'
    )
    .map((config) => ({
      ...config,
      files: ['**/*.mdx'],
    })),
  subConfig,
];

export default config;
