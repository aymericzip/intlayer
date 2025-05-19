import { getConfiguration } from '@intlayer/config';
import { existsSync, rmSync } from 'fs';
import { createDictionaryEntryPoint } from './transpiler/dictionary_to_main/createDictionaryEntryPoint';

export const cleanOutputDir = (configuration = getConfiguration()) => {
  const { dictionariesDir, typesDir } = configuration.content;

  if (existsSync(dictionariesDir)) {
    // Delete the dictionary directory
    rmSync(dictionariesDir, { recursive: true });
  }

  // Delete the types directory
  if (existsSync(typesDir)) {
    rmSync(typesDir, { recursive: true });
  }

  createDictionaryEntryPoint(configuration);
};
