const prettierConfig = require('@utils/eslint-config/prettier.base.config.js');

/**
 * @type {import('prettier').Config}
 */
const config = {
  ...prettierConfig,
  singleQuote: true,
  overrides: [
    {
      files: '*.md',
      options: {
        singleQuote: false,
        quoteProps: 'preserve',
      },
    },
  ],
};

module.exports = config;
