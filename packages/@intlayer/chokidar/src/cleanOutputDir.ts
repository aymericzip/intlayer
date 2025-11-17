import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { getAppLogger } from '@intlayer/config/client';
import type { IntlayerConfig } from '@intlayer/types';

export const cleanOutputDir = async (configuration: IntlayerConfig) => {
  const {
    dictionariesDir,
    unmergedDictionariesDir,
    dynamicDictionariesDir,
    remoteDictionariesDir,
    fetchDictionariesDir,
    mainDir,
    typesDir,
    configDir,
    cacheDir,
  } = configuration.content;

  const appLogger = getAppLogger(configuration);

  const directoriesToClean: string[] = [
    dictionariesDir, // Merged dictionaries
    unmergedDictionariesDir, // Unmerged dictionaries
    dynamicDictionariesDir, // Dynamic dictionaries
    remoteDictionariesDir, // Remote dictionaries
    fetchDictionariesDir, // Fetch dictionaries
    mainDir, // Main files
    typesDir, // Types
    configDir, // Configuration
    cacheDir, // Cache
  ];

  // Execute all deletions in parallel
  await Promise.all(
    directoriesToClean
      .filter((dir) => existsSync(dir))
      .map((dir) => rm(dir, { recursive: true, force: true }))
  );

  appLogger('Output directory cleaned', {
    isVerbose: true,
  });
};
