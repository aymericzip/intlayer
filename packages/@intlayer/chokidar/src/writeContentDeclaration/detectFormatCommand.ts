import { ESMxCJSRequire } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';

export const detectFormatCommand = (configuration: IntlayerConfig) => {
  const { formatCommand } = configuration.content;

  if (formatCommand) {
    return formatCommand;
  }

  // Try Prettier
  try {
    ESMxCJSRequire.resolve('prettier');

    return 'prettier --write "{{file}}" --log-level silent';
  } catch (_error) {
    // Prettier not found, continue to next option
  }

  // Try Biome
  try {
    ESMxCJSRequire.resolve('biome');

    return 'biome format "{{file}}" --write --log-level none';
  } catch (_error) {
    // Biome not found, continue to next option
  }

  // Try ESLint
  try {
    ESMxCJSRequire.resolve('eslint');

    return 'eslint --fix "{{file}}" --quiet';
  } catch (_error) {
    // ESLint not found, no formatter available
  }

  // No formatter found
  return undefined;
};
