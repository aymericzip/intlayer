import { existsSync, rmSync } from 'node:fs';
import { getAppLogger } from '@intlayer/config/client';
import type { IntlayerConfig } from '@intlayer/types';

export const cleanOutputDir = (configuration: IntlayerConfig) => {
  const {
    dictionariesDir,
    unmergedDictionariesDir,
    dynamicDictionariesDir,
    mainDir,
    typesDir,
    configDir,
  } = configuration.content;

  const appLogger = getAppLogger(configuration);

  if (existsSync(dictionariesDir)) {
    // Delete the dictionary directory
    rmSync(dictionariesDir, { recursive: true });
  }

  if (existsSync(unmergedDictionariesDir)) {
    // Delete the unmerged dictionaries directory
    rmSync(unmergedDictionariesDir, { recursive: true });
  }

  if (existsSync(dynamicDictionariesDir)) {
    // Delete the dynamic dictionaries directory
    rmSync(dynamicDictionariesDir, { recursive: true });
  }

  // Delete the main directory
  if (existsSync(mainDir)) {
    rmSync(mainDir, { recursive: true });
  }

  // Delete the types directory
  if (existsSync(typesDir)) {
    rmSync(typesDir, { recursive: true });
  }

  // Delete the config directory
  if (existsSync(configDir)) {
    rmSync(configDir, { recursive: true });
  }

  appLogger('Output directory cleaned', {
    isVerbose: true,
  });
};
