import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @type {import('eslint').Linter.Config[]} */
const config = [
  // @ts-expect-error - Type incompatibility between ESLint versions
  ...compat
    .extends(
      'plugin:mdx/recommended',
      'plugin:@typescript-eslint/disable-type-checked'
    )
    .map((config) => ({
      ...config,
      files: ['**/*.mdx'],
    })),
  // @ts-expect-error - Type incompatibility between ESLint versions
  {
    files: ['**/*.mdx'],
    rules: {
      '@typescript-eslint/consistent-type-exports': 'off',
    },
  },
];

export default config;
