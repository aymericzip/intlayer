import globals from 'globals';
import tsEslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  // @ts-expect-error: Type not compatible
  ...tsEslint.configs.recommended,
  // @ts-expect-error: Type not compatible
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-check': 'allow-with-description',
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
        },
      ],
    },
  },

  // {
  //   // @ts-ignore
  //   languageOptions: {
  //     globals: {
  //       ...globals.browser,
  //       ...globals.node,
  //     },

  //     parser: espree,
  //     parserOptions: {
  //       ecmaFeatures: {
  //         jsx: true,
  //         globalReturn: false,
  //       },
  //       ecmaVersion: 6,
  //       project: ['tsconfig.json'],
  //       sourceType: 'module',
  //     },
  //     ecmaVersion: 6,
  //     sourceType: 'script',
  //   },

  //   rules: {
  //     '@typescript-eslint/no-unsafe-assignment': 'off',
  //     '@typescript-eslint/no-unsafe-call': 'off',
  //     '@typescript-eslint/no-unsafe-member-access': 'off',
  //     '@typescript-eslint/no-unsafe-return': 'off',
  //     '@typescript-eslint/no-unsafe-argument': 'off',
  //     '@typescript-eslint/no-redundant-type-constituents': 'off',

  //     '@typescript-eslint/ban-ts-comment': [
  //       'error',
  //       {
  //         'ts-expect-error': 'allow-with-description',
  //         minimumDescriptionLength: 10,
  //         'ts-ignore': true,
  //         'ts-nocheck': true,
  //         'ts-check': false,
  //       },
  //     ],

  //     '@typescript-eslint/no-explicit-any': [
  //       'error',
  //       {
  //         ignoreRestArgs: false,
  //       },
  //     ],

  //     '@typescript-eslint/no-empty-function': [
  //       'error',
  //       {
  //         allow: ['private-constructors'],
  //       },
  //     ],

  //     '@typescript-eslint/consistent-type-exports': 'error',

  //     '@typescript-eslint/consistent-type-imports': [
  //       'error',
  //       {
  //         prefer: 'type-imports',
  //         fixStyle: 'inline-type-imports',
  //       },
  //     ],

  //     '@typescript-eslint/no-import-type-side-effects': 'error',
  //     '@typescript-eslint/consistent-type-definitions': 'off',

  //     '@typescript-eslint/unbound-method': [
  //       'error',
  //       {
  //         ignoreStatic: true,
  //       },
  //     ],

  //     '@typescript-eslint/restrict-template-expressions': [
  //       'error',
  //       {
  //         allowNumber: true,
  //         allowBoolean: true,
  //         allowAny: true,
  //         allowNever: true,
  //         allowNullish: true,
  //       },
  //     ],

  //     '@typescript-eslint/no-misused-promises': [
  //       'error',
  //       {
  //         checksVoidReturn: {
  //           arguments: false,
  //           attributes: false,
  //         },
  //       },
  //     ],
  //   },
  // },
  {
    files: ['**/*.d.ts'],
    // @ts-expect-error: Type not compatible
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          globalReturn: false,
        },
        ecmaVersion: 'latest',
        project: ['tsconfig.json'],
        sourceType: 'module',
      },
      ecmaVersion: 'latest',
      sourceType: 'script',
    },

    rules: {
      '@typescript-eslint/no-import-type-side-effects': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  // {
  //   files: ['**/*.mjs'],

  //   // @ts-ignore
  //   languageOptions: {
  //     globals: {
  //       ...globals.browser,
  //       ...globals.node,
  //     },

  //     parser: espree,
  //     parserOptions: {
  //       ecmaFeatures: {
  //         jsx: true,
  //         globalReturn: false,
  //       },
  //       ecmaVersion: 6,
  //       project: ['tsconfig.json'],
  //       sourceType: 'module',
  //     },
  //     ecmaVersion: 6,
  //     sourceType: 'script',
  //   },

  //   rules: {
  //     '@typescript-eslint/explicit-module-boundary-types': 'off',
  //     '@typescript-eslint/consistent-type-exports': 'off',
  //     '@typescript-eslint/consistent-type-imports': 'off',
  //     '@typescript-eslint/no-unsafe-call': 'off',
  //     '@typescript-eslint/no-unsafe-member-access': 'off',
  //     '@typescript-eslint/no-unsafe-return': 'off',
  //   },
  // },
  // {
  //   files: ['**/*.js', '**/*.cjs'],

  //   // @ts-ignore
  //   languageOptions: {
  //     globals: {
  //       ...globals.browser,
  //       ...globals.node,
  //     },

  //     parser: espree,
  //     parserOptions: {
  //       ecmaFeatures: {
  //         jsx: true,
  //         globalReturn: false,
  //       },
  //       ecmaVersion: 6,
  //       project: ['tsconfig.json'],
  //       sourceType: 'module',
  //     },
  //     ecmaVersion: 6,
  //     sourceType: 'script',
  //   },
  //   rules: {
  //     '@typescript-eslint/ban-ts-comment': 'off',
  //     '@typescript-eslint/no-explicit-any': 'off',
  //     '@typescript-eslint/no-var-requires': 'off',
  //     '@typescript-eslint/explicit-module-boundary-types': 'off',
  //     '@typescript-eslint/consistent-type-exports': 'off',
  //     '@typescript-eslint/consistent-type-imports': 'off',
  //   },
  // },
];

export default config;
