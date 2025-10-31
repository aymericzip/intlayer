import type { IntlayerConfig } from '@intlayer/types';
import fg from 'fast-glob';

/**
 * List all dictionaries absolute paths in the project
 * @param configuration - The configuration object
 * @returns An array of dictionary paths
 */
export const listDictionaries = async (
  configuration: IntlayerConfig
): Promise<string[]> => {
  const files: string[] = await fg(
    configuration.content.watchedFilesPatternWithPath,
    {
      ignore: configuration.content.excludedPath,
    }
  );

  return files;
};
