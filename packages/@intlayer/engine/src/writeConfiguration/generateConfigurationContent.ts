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
 * @param configuration - The fully resolved Intlayer configuration.
 * @param format - Module format to emit (`esm` for `.mjs`, `cjs` for `.cjs`).
 * @returns The file content as a string.
 */
export const generateConfigurationContent = (
  configuration: IntlayerConfig,
  format: 'cjs' | 'esm'
): string => {
  let fileContent = '';

  for (const key of BUILT_CONFIG_KEYS) {
    const value = configuration[key];
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
