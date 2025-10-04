import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// @ts-ignore - Type declaration issue
import prettierConfig from '../prettier.base.config.js';

/** @type {import('eslint').Linter.Config} */
const subConfig = {
  rules: {
    'prettier/prettier': ['error', prettierConfig],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
};

/** @type {import('eslint').Linter.Config[]} */
const config = [eslintPluginPrettierRecommended, subConfig];

export default config;
