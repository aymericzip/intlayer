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
// @ts-expect-error - Type incompatibility between ESLint versions
const config = [
  ...compat.extends('plugin:regexp/recommended').map((config) => ({
    ...config,
    files: ['**/*.{js,jsx,jsx,tsx}'],
  })),
];

export default config;
