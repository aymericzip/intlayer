import { existsSync, rmSync, mkdirSync } from 'fs';
import { getConfiguration } from '@intlayer/config';

export const cleanOutputDir = () => {
  const { content } = getConfiguration();

  const { resultDir } = content;

  // Delete the dictionary directory dictionariesDir
  if (existsSync(resultDir)) {
    rmSync(resultDir, { recursive: true });
  }

  // Create the dictionary directory dictionariesDir
  mkdirSync(resultDir);
};
