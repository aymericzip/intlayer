import { mkdir } from 'fs/promises';
import { resolve } from 'path';
// @ts-ignore: @intlayer/backend is not built yet
import type { DictionaryAPI } from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { writeMergedDictionaries } from './writeMergedDictionary';
import { writeUnmergedDictionaries } from './writeUnmergedDictionary';

/**
 * This function transpile the bundled code to to make dictionaries as JSON files
 */
export const buildIntlayerDictionary = async (
  contentDeclarations: (DictionaryAPI | Dictionary)[],
  configuration = getConfiguration()
) => {
  const { dictionariesDir } = configuration.content;

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(dictionariesDir), { recursive: true });

  const unmergedDictionaries = await writeUnmergedDictionaries(
    contentDeclarations,
    configuration
  );

  const mergedDictionaries = await writeMergedDictionaries(
    unmergedDictionaries,
    configuration
  );

  return mergedDictionaries;
};
