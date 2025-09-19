import baseConfig from '@utils/eslint-config';

export default [
  ...baseConfig,
  {
    ignores: ['**/examples/*', 'packages/svelte-intlayer/**'],
  },
];
