import { getAppLogger, getConfiguration } from '@intlayer/config';
import { existsSync, rmSync } from 'fs';

export const cleanOutputDir = (configuration = getConfiguration()) => {
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
