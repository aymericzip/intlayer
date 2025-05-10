import { getConfiguration } from '@intlayer/config';
import fg from 'fast-glob';
import { existsSync, mkdirSync } from 'fs';

/**
 * This function generates a list of dictionaries in the main directory
 */
export const getBuiltUnmergedDictionariesPath = (
  configuration = getConfiguration()
) => {
  const { unmergedDictionariesDir, mainDir } = configuration.content;

  // Create main directory if it doesn't exist
  if (!existsSync(mainDir)) {
    mkdirSync(mainDir, { recursive: true });
  }

  const dictionariesPath: string[] = fg.sync(
    `${unmergedDictionariesDir}/**/*.json`
  );

  return dictionariesPath;
};
