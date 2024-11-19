import typeScriptParser from '@typescript-eslint/parser';
import globals from 'globals';
import _ from 'lodash';

import javaScriptConfig from './config/javascript.mjs';
import jsonConfig from './config/json.mjs';
import mdxConfig from './config/mdx.mjs';
import prettierPluginConfig from './config/prettier.mjs';
import reactConfig from './config/react.mjs';
import regexpConfig from './config/regexp.mjs';
// import sonarConfig from './config/sonar.mjs';
import securityConfig from './config/security.mjs';
import tailwindConfig from './config/tailwind.mjs';
import typescriptConfig from './config/typescript.mjs';

/** @type {import('eslint').Linter.Config} */
const subConfig = {
  files: ['**/*.{ts,tsx,js,jsx,cjs,mjs}'],
  languageOptions: {
    parser: typeScriptParser,
    parserOptions: {
      ecmaVersion: 6,
      project: true,
      tsconfigRootDir: process.cwd(), // or import.meta.dirname for ESM
      sourceType: 'module',
    },
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
};

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...[
    ...javaScriptConfig,
    ...jsonConfig,
    ...mdxConfig,
    ...prettierPluginConfig,
    ...reactConfig,
    ...regexpConfig,
    // ...sonarConfig,
    ...tailwindConfig,
    ...typescriptConfig,
    ...securityConfig,
  ].map((config) => _.merge({}, subConfig, config)),
  {
    ignores: [
      '**/node_modules/*',
      '**/.cache/*',
      '**/.next/*',
      '**/.github/*',
      '**/.git/*',
      '**/.vercel/*',
      '**/.intlayer/*',
      '**/build/*',
      '**/dist/*',
      '**/storybook-static/*',
      '**/.pnpm/*',
      '**/*-lock.yaml',
      '**/*-lock.json',
    ],
  },
];

export default config;
