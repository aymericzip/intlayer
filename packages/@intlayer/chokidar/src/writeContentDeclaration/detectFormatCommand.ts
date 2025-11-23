import { getProjectRequire } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';

export const detectFormatCommand = (configuration: IntlayerConfig) => {
  try {
    const { formatCommand, baseDir } = configuration.content;
    const projectRequire = getProjectRequire(baseDir);

    if (formatCommand) {
      return formatCommand;
    }

    // Try Prettier
    try {
      projectRequire.resolve('prettier');

      return 'prettier --write "{{file}}" --log-level silent';
    } catch (_error) {
      // Prettier not found, continue to next option
    }

    // Try Biome
    try {
      projectRequire.resolve('biome');

      return 'biome format "{{file}}" --write --log-level none';
    } catch (_error) {
      // Biome not found, continue to next option
    }

    // Try ESLint
    try {
      projectRequire.resolve('eslint');

      return 'eslint --fix "{{file}}" --quiet';
    } catch (_error) {
      // ESLint not found, no formatter available
    }
  } catch {}

  // No formatter found
  return undefined;
};
