import sonarjs from 'eslint-plugin-sonarjs';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  sonarjs.configs.recommended,
  {
    rules: {
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/function-return-type': 'off',
      'sonarjs/no-commented-code': 'off',
      'sonarjs/redundant-type-aliases': 'off',
      'sonarjs/no-nested-conditional': 'warn',
      'sonarjs/single-character-alternation': 'off',
      'sonarjs/todo-tag': 'warn',
    },
  },
];

export default config;
