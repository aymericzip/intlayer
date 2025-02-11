import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
// @ts-expect-error: No types available
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @type {import('eslint').Linter.Config} */
const subConfig = {
  plugins: {
    'prefer-arrow-functions': preferArrowFunctions,
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.mts'],
    },

    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },

  rules: {
    'import/no-cycle': 'warn',

    'no-duplicate-imports': 'off',

    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },

        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],

    'linebreak-style': ['error', 'unix'],
    'no-empty-function': 'off',
    'import/default': ['error'],
    'import/no-unresolved': 'off',
    'import/namespace': 'off',

    'import/no-duplicates': [
      'error',
      {
        'prefer-inline': true,
        considerQueryString: true,
      },
    ],

    'import/no-named-as-default-member': ['warn'],
    'import/no-named-as-default': ['warn'],

    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],

        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    'prefer-arrow-functions/prefer-arrow-functions': [
      'warn',
      {
        allowNamedFunctions: false,
        classPropertiesAllowed: false,
        disallowPrototype: false,
        returnStyle: 'unchanged',
        singleReturnOnly: false,
      },
    ],

    'no-console': [
      'warn',
      {
        allow: ['warn', 'info', 'error'],
      },
    ],
  },
};

const config = [
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:import/recommended',
      'plugin:import/typescript'
    )
  ),
  subConfig,
];

export default config;
