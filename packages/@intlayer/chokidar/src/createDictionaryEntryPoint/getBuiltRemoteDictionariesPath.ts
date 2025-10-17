import { existsSync, mkdirSync } from 'node:fs';
import { normalizePath } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';
import fg from 'fast-glob';

/**
 * This function generates a list of dictionaries in the main directory
 */
export const getBuiltRemoteDictionariesPath = async (
  configuration: IntlayerConfig
) => {
  const { remoteDictionariesDir, mainDir } = configuration.content;

  // Create main directory if it doesn't exist
  if (!existsSync(mainDir)) {
    mkdirSync(mainDir, { recursive: true });
  }

  const dictionariesPath: string[] = fg.sync(
    `${normalizePath(remoteDictionariesDir)}/**/*.json`
  );

  return dictionariesPath;
};
