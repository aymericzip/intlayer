import { type IntlayerConfig, getConfiguration } from '@intlayer/config';
import fg from 'fast-glob';

/**
 * List all dictionaries absolute paths in the project
 * @param configuration - The configuration object
 * @returns An array of dictionary paths
 */
export const listDictionaries = (
  configuration: IntlayerConfig = getConfiguration()
): string[] => {
  const files: string[] = fg.sync(
    configuration.content.watchedFilesPatternWithPath,
    {
      ignore: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.github/**',
        '**/.next/**',
        '**/.expo/**',
        '**/.expo-shared/**',
        '**/.vercel/**',
        '**/.cache/**',
        '**/dist/**',
        '**/build/**',
        '**/.intlayer/**',
      ],
    }
  );

  return files;
};
