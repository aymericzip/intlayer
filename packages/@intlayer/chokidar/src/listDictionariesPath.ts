import { type IntlayerConfig, getConfiguration } from '@intlayer/config';
import fg from 'fast-glob';

export const listDictionaries = (
  configuration: IntlayerConfig = getConfiguration()
) => {
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
