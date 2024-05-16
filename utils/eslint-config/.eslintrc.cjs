// @ts-nocheck
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: ['tsconfig.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    `node_modules`,
    `**/node_modules`,
    '**/.cache',
    'build',
    'dist',
    'public',
    'storybook-static',
    '.pnpm',
    '.turbo',
    `**/.turbo`,
    '.out',
  ],
  extends: [
    './config/javascript',
    './config/jest',
    './config/json',
    './config/mdx',
    './config/playwright',
    './config/prettier-config',
    './config/prettier-plugin',
    './config/react',
    './config/regexp',
    './config/rtl',
    './config/sonar',
    './config/storybook',
    './config/tailwind',
    './config/typescript',
  ],
  rules: {
    // optional overrides
  },
  overrides: [
    // optional overrides
  ],
};
