import { mkdir } from 'fs/promises';
import { resolve } from 'path';
import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { writeDictionary } from './writeDictionary';

const { content } = getConfiguration();
const { dictionariesDir } = content;

/**
 * This function transpile the bundled code to to make dictionaries as JSON files
 */
export const buildIntlayerDictionary = async (
  contentDeclarations: Dictionary[]
) => {
  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(dictionariesDir), { recursive: true });

  const dictionariesPaths: string[] =
    await writeDictionary(contentDeclarations);

  return dictionariesPaths;
};
