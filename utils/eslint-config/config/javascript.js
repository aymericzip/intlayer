/**
 * Custom config base for projects using prettier.
 * @see https://github.com/aypineau/sayaup/tree/main/packages/eslint-config-bases
 */

module.exports = {
  plugins: ['prefer-arrow-functions'],
  rules: {
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
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
