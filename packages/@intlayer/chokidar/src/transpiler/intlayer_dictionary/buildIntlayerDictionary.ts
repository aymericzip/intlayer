// @ts-ignore: @intlayer/backend is not built yet
import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import {
  LocalizedDictionaryOutput,
  writeDynamicDictionary,
} from './writeDynamicDictionary';
import { writeFetchDictionary } from './writeFetchDictionary';
import { writeMergedDictionaries } from './writeMergedDictionary';
import { writeUnmergedDictionaries } from './writeUnmergedDictionary';

/**
 * This function transpile the bundled code to to make dictionaries as JSON files
 */
export const buildDictionary = async (
  localDictionariesEntries: Dictionary[],
  configuration = getConfiguration(),
  formats: ('cjs' | 'esm')[] = ['cjs', 'esm']
) => {
  const { importMode } = configuration.build;

  const unmergedDictionaries = await writeUnmergedDictionaries(
    localDictionariesEntries,
    configuration
  );

  const mergedDictionaries = await writeMergedDictionaries(
    unmergedDictionaries,
    configuration
  );

  let dynamicDictionaries: LocalizedDictionaryOutput | null = null;

  if (importMode === 'dynamic' || importMode === 'live') {
    dynamicDictionaries = await writeDynamicDictionary(
      mergedDictionaries,
      configuration,
      formats
    );
  }

  let fetchDictionaries: LocalizedDictionaryOutput | null = null;

  if (importMode === 'live') {
    fetchDictionaries = await writeFetchDictionary(
      dynamicDictionaries!,
      configuration,
      formats
    );
  }

  return {
    unmergedDictionaries,
    mergedDictionaries,
    dynamicDictionaries,
    fetchDictionaries,
  };
};
