// @ts-expect-error: No types available
import jsonFormat from 'eslint-plugin-json-format';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    plugins: {
      'json-format': jsonFormat,
    },
  },
];

export default config;
