/**
 * Custom config base for projects using prettier.
 * @see https://github.com/aypineau/sayaup/tree/main/packages/eslint-config-bases
 */

const prettierConfig = require('../prettier.base.config.js');

module.exports = {
  extends: ['prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', prettierConfig],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
};
