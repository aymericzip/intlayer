import { BUILT_CONFIG_KEYS } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * Generates the source of the `.intlayer/config/configuration.{mjs,cjs}` file
 * that bundler integrations alias `@intlayer/config/built` to.
 *
 * The emitted named exports are derived from {@link BUILT_CONFIG_KEYS}, the same
 * canonical list `built.ts` uses, so the aliased file always exposes exactly the
 * exports consumers import — preventing `MISSING_EXPORT` errors when a new
 * configuration section (e.g. `analytics`) is added.
 *
 * ## Why `editor.clientSecret` is never emitted
 *
 * This file is what a bundle *inlines*. Every framework integration installs the
 * same alias for the client and the server build, so anything written here that
 * a client module imports ends up in a public asset — and `editor` is imported
 * by browser code (the provider, the analytics SDK, the visual editor).
 *
 * `clientSecret` grants full project-scoped API access, so it is stripped here
 * rather than in each integration: a per-bundler fix only protects the bundlers
 * we patched, while stripping it at the source protects every consumer,
 * including ones that build their own alias.
 *
 * Server-side code reads the secret from `@intlayer/config/secrets`, whose
 * `browser` export condition resolves to an empty stub in browser builds.
 *
 * @param configuration - The fully resolved Intlayer configuration.
 * @param format - Module format to emit (`esm` for `.mjs`, `cjs` for `.cjs`).
 * @returns The file content as a string.
 */
export const generateConfigurationContent = (
  configuration: IntlayerConfig,
  format: 'cjs' | 'esm'
): string => {
  let fileContent = '';

  const { clientSecret: _clientSecret, ...editorWithoutSecret } =
    configuration.editor;

  const values: Record<string, unknown> = {
    ...configuration,
    editor: editorWithoutSecret,
  };

  for (const key of BUILT_CONFIG_KEYS) {
    const value = values[key];
    fileContent += `const ${key} = ${JSON.stringify(value, null, 2)};\n`;
  }

  if (format === 'esm') {
    fileContent += `\nexport { ${BUILT_CONFIG_KEYS.join(', ')} };\n`;
  } else {
    fileContent += '\n';
    for (const key of BUILT_CONFIG_KEYS) {
      fileContent += `module.exports.${key} = ${key};\n`;
    }
  }

  return fileContent;
};
