import { existsSync, mkdirSync } from 'node:fs';
import { basename } from 'node:path';
import { normalizePath } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';
import fg from 'fast-glob';

/**
 * This function generates a list of dictionaries in the main directory
 */
export const getBuiltFetchDictionariesPath = async (
  configuration: IntlayerConfig,
  format: 'cjs' | 'esm' = 'esm',
  excludeKeys: string[] = []
) => {
  const { fetchDictionariesDir, mainDir } = configuration.content;

  // Create main directory if it doesn't exist
  if (!existsSync(mainDir)) {
    mkdirSync(mainDir, { recursive: true });
  }

  const extension = format === 'cjs' ? 'cjs' : 'mjs';

  const dictionariesPath: string[] = await fg(
    `${normalizePath(fetchDictionariesDir)}/**/*.${extension}`
  );

  return dictionariesPath.filter((path) => {
    const key = basename(path, `.${extension}`);
    return !excludeKeys.includes(key);
  });
};
