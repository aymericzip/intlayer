// Allow to pass an env to check cycles, defaults to 2 (lint time+++)
// @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md
// @see https://medium.com/@steven-lemon182/are-typescript-barrel-files-an-anti-pattern-72a713004250
const checkCycles = process.env?.ESLINT_IMPORT_NO_CYCLE === 'true';

module.exports = {
  plugins: ['prefer-arrow-functions'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
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
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md
    ...(checkCycles ? { 'import/no-cycle': 2 } : {}),
    // will use 'import/no-duplicates'.
    'no-duplicate-imports': 'off',
    'import/extensions': ['error', 'never', { ignorePackages: true }],
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
    // Caution this rule is slow https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/namespace.md
    'import/namespace': 'off', // ['error'] If you want the extra check (typechecking will spot most issues already)
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
    'import/no-duplicates': [
      'error',
      { 'prefer-inline': true, considerQueryString: true },
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
        alphabetize: { order: 'asc', caseInsensitive: true },
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
    'no-console': ['warn', { allow: ['warn', 'info', 'error'] }],
  },
};
