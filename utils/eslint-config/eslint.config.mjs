import typeScriptParser from '@typescript-eslint/parser';
import globals from 'globals';

import javaScriptConfig from './config/javascript.mjs';
import jsonConfig from './config/json.mjs';
import mdxConfig from './config/mdx.mjs';
import prettierPluginConfig from './config/prettier.mjs';
import reactConfig from './config/react.mjs';
import regexpConfig from './config/regexp.mjs';
import securityConfig from './config/security.mjs';
import sonarConfig from './config/sonar.mjs';
import tailwindConfig from './config/tailwind.mjs';
import typescriptConfig from './config/typescript.mjs';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    files: ['**/*.{ts,tsx,js,jsx,cjs,mjs}'],
    languageOptions: {
      parser: typeScriptParser,
      parserOptions: {
        ecmaVersion: 6,
        projectService: true,
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  ...javaScriptConfig,
  ...jsonConfig,
  ...mdxConfig,
  ...prettierPluginConfig,
  ...reactConfig,
  ...regexpConfig,
  ...sonarConfig,
  ...tailwindConfig,
  ...typescriptConfig,
  ...securityConfig,
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
