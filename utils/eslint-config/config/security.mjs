import pluginSecurity from 'eslint-plugin-security';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    // @ts-ignore - Type incompatibility between ESLint versions
    plugins: {
      // @ts-ignore - Type incompatibility between ESLint versions
      security: pluginSecurity,
    },
    rules: {
      // @ts-ignore - Type incompatibility between ESLint versions
      ...pluginSecurity.configs.recommended.rules,
      'security/detect-object-injection': 'off',
    },
  },
];

export default config;
