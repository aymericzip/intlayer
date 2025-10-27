import { existsSync, mkdirSync } from 'node:fs';
import { normalizePath } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';
import fg from 'fast-glob';

/**
 * This function generates a list of dictionaries in the main directory
 */
export const getBuiltDynamicDictionariesPath = async (
  configuration: IntlayerConfig,
  format: 'cjs' | 'esm' = 'esm'
) => {
  const { dynamicDictionariesDir, mainDir } = configuration.content;

  // Create main directory if it doesn't exist
  if (!existsSync(mainDir)) {
    mkdirSync(mainDir, { recursive: true });
  }

  const extension = format === 'cjs' ? 'cjs' : 'mjs';

  const dictionariesPath: string[] = await fg(
    `${normalizePath(dynamicDictionariesDir)}/**/*.${extension}`
  );

  return dictionariesPath;
};
