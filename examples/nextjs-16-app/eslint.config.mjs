import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import intlayer from 'eslint-plugin-intlayer';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Registers the plugin, ignores `.intlayer/` generated output and pins
  // `settings.react.version` (ESLint 10 removed `context.getFilename()`, which
  // eslint-plugin-react's `"detect"` codepath still calls).
  ...intlayer,
  {
    rules: {
      'intlayer/no-raw-text': 'warn',
      'intlayer/static-dictionary-key': 'error',
      'intlayer/no-dynamic-field-access': 'error',
      'intlayer/enforce-adapter-import': 'warn',
      'intlayer/no-unused-content': 'warn',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
