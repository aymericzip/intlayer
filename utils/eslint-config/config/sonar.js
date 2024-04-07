const sonarPatterns = {
  files: ['*.{js,jsx,ts,tsx}'],
  excludedFiles: [
    '**/?(*.)+(test).{js,jsx,ts,tsx}',
    '*.stories.{js,ts,jsx,tsx}',
  ],
};

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    'sonarjs/no-duplicate-string': ['error', { threshold: 6 }],
  },
  overrides: [
    {
      files: sonarPatterns.files,
      excludedFiles: sonarPatterns.excludedFiles,
      extends: ['plugin:sonarjs/recommended'],
      rules: {
        'sonarjs/no-nested-template-literals': 'off',
        'sonarjs/prefer-single-boolean-return': 'off',
      },
    },
    {
      files: ['*.{jsx,tsx}'],
      rules: {
        // relax complexity for react code
        'sonarjs/cognitive-complexity': ['error', 15],
      },
    },

    {
      // relax javascript code as it often contains obscure configs
      files: ['*.js', '*.cjs'],
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 2020,
      },
      rules: {
        'sonarjs/no-all-duplicated-branches': 'off',
      },
    },
  ],
};
