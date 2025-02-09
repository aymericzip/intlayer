import { existsSync, rmSync } from 'fs';
import { getConfiguration } from '@intlayer/config';
import { createDictionaryEntryPoint } from './transpiler/dictionary_to_main/createDictionaryEntryPoint';

export const cleanOutputDir = () => {
  const { content } = getConfiguration();

  const { resultDir, typesDir, dictionariesDir } = content;

  if (existsSync(resultDir)) {
    // Delete the dictionary directory
    if (existsSync(dictionariesDir)) {
      rmSync(dictionariesDir, { recursive: true });
    }

    // Delete the types directory
    if (existsSync(typesDir)) {
      rmSync(typesDir, { recursive: true });
    }
  }

  createDictionaryEntryPoint();
};
