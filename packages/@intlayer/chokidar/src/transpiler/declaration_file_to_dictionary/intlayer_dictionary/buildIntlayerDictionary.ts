// @ts-ignore: @intlayer/backend is not built yet
import type { DictionaryAPI } from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { writeDynamicDictionary } from './writeDynamicDictionary';
import { writeMergedDictionaries } from './writeMergedDictionary';
import { writeUnmergedDictionaries } from './writeUnmergedDictionary';

/**
 * This function transpile the bundled code to to make dictionaries as JSON files
 */
export const buildIntlayerDictionary = async (
  contentDeclarations: (DictionaryAPI | Dictionary)[],
  configuration = getConfiguration(),
  formats: ('cjs' | 'esm')[] = ['cjs', 'esm']
) => {
  const unmergedDictionaries = await writeUnmergedDictionaries(
    contentDeclarations,
    configuration
  );

  const mergedDictionaries = await writeMergedDictionaries(
    unmergedDictionaries,
    configuration
  );

  const dynamicDictionaries = await writeDynamicDictionary(
    mergedDictionaries,
    configuration,
    formats
  );

  return {
    unmergedDictionaries,
    mergedDictionaries,
    dynamicDictionaries,
  };
};
