import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import {
  type LocalizedDictionaryOutput,
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
  formats: ('cjs' | 'esm')[] = ['cjs', 'esm'],
  importOtherDictionaries = true
) => {
  const { importMode } = configuration.build;

  const unmergedDictionariesToUpdate: Dictionary[] = [
    ...localDictionariesEntries,
  ];

  if (importOtherDictionaries) {
    const prevUnmergedDictionaries: Record<string, Dictionary[]> =
      getUnmergedDictionaries(configuration);

    // Reinsert other dictionaries with the same key to avoid merging errors
    for (const dictionaryToWrite of localDictionariesEntries) {
      const allPrebuiltUnmergedDictionaries =
        prevUnmergedDictionaries[dictionaryToWrite.key];

      if (allPrebuiltUnmergedDictionaries?.length > 0) {
        // Do not add the same dictionary again by filtering out the one with the same localId
        const otherUnmergedDictionaries =
          allPrebuiltUnmergedDictionaries.filter(
            (unmergedDictionary) =>
              unmergedDictionary.localId !== dictionaryToWrite.localId
          );

        unmergedDictionariesToUpdate.push(...otherUnmergedDictionaries);
      }
    }
  }

  const unmergedDictionaries = await writeUnmergedDictionaries(
    unmergedDictionariesToUpdate,
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
