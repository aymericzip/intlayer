import pluginSecurity from 'eslint-plugin-security';

export default [
  pluginSecurity.configs.recommended,
  {
    rules: { 'security/detect-object-injection': 'off' },
  },
];
