import { getConfiguration, normalizePath } from '@intlayer/config';
import fg from 'fast-glob';
import { existsSync, mkdirSync } from 'fs';

/**
 * This function generates a list of dictionaries in the main directory
 */
export const getBuiltFetchDictionariesPath = (
  configuration = getConfiguration(),
  format: 'cjs' | 'esm' = 'esm'
) => {
  const { fetchDictionariesDir, mainDir } = configuration.content;

  // Create main directory if it doesn't exist
  if (!existsSync(mainDir)) {
    mkdirSync(mainDir, { recursive: true });
  }

  const extension = format === 'cjs' ? 'cjs' : 'mjs';

  const dictionariesPath: string[] = fg.sync(
    `${normalizePath(fetchDictionariesDir)}/**/*.${extension}`
  );

  return dictionariesPath;
};
