import { mkdir } from 'fs/promises';
import { resolve } from 'path';
// @ts-ignore: @intlayer/backend is not built yet
import type { DictionaryAPI } from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { writeDictionary } from './writeDictionary';

const { content } = getConfiguration();
const { dictionariesDir } = content;

/**
 * This function transpile the bundled code to to make dictionaries as JSON files
 */
export const buildIntlayerDictionary = async (
  contentDeclarations: (DictionaryAPI | Dictionary)[]
) => {
  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(dictionariesDir), { recursive: true });

  const dictionariesPaths: string[] = await writeDictionary(
    contentDeclarations as Dictionary[]
  );

  return dictionariesPaths;
};
