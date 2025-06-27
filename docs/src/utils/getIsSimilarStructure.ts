import { logger } from '@intlayer/config';

/**
 * Simple structure check comparing the number of '#' characters
 */
export const getIsSimilarStructure = (
  baseFileContent: string,
  translatedFileContent: string
): boolean => {
  const translatedFileHashtagCount = (translatedFileContent.match(/#/g) || [])
    .length;
  const baseFileHashtagCount = (baseFileContent.match(/#/g) || []).length;

  logger(`   -> Number of '#' in base file: ${baseFileHashtagCount}`);
  logger(
    `   -> Number of '#' in translated file: ${translatedFileHashtagCount}`
  );

  return translatedFileHashtagCount === baseFileHashtagCount;
};
