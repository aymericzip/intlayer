import { existsSync, mkdirSync } from 'fs';
import { getConfiguration } from '@intlayer/config';
import fg from 'fast-glob';

const { content } = getConfiguration();
const { dictionariesDir, mainDir } = content;

/**
 * This function generates a list of dictionaries in the main directory
 */
export const getDictionariesPath = () => {
  // Create main directory if it doesn't exist
  if (!existsSync(mainDir)) {
    mkdirSync(mainDir, { recursive: true });
  }

  const dictionariesPath: string[] = fg.sync(`${dictionariesDir}/**/*.json`);

  return dictionariesPath;
};
