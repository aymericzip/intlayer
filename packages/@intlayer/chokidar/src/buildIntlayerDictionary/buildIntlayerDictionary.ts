import { DefaultValues } from '@intlayer/config/client';
import { getConfiguration } from '@intlayer/config/node';
import type { Dictionary } from '@intlayer/types';
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
  const importMode =
    configuration.build.importMode ??
    configuration.dictionary?.importMode ??
    DefaultValues.Dictionary.IMPORT_MODE;

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

  const dictionariesToBuildDynamic: typeof mergedDictionaries = {};
  const keysToBuildFetch = new Set<string>();

  for (const [key, mergedResult] of Object.entries(mergedDictionaries)) {
    const dictionary = mergedResult.dictionary;
    const mode = dictionary.importMode ?? importMode;

    if (mode === 'dynamic' || mode === 'fetch') {
      dictionariesToBuildDynamic[key] = mergedResult;
    }

    if (mode === 'fetch') {
      keysToBuildFetch.add(key);
    }
  }

  let dynamicDictionaries: LocalizedDictionaryOutput | null = null;

  if (Object.keys(dictionariesToBuildDynamic).length > 0) {
    dynamicDictionaries = await writeDynamicDictionary(
      dictionariesToBuildDynamic,
      configuration,
      formats
    );
  }

  let fetchDictionaries: LocalizedDictionaryOutput | null = null;

  if (dynamicDictionaries && keysToBuildFetch.size > 0) {
    const dictionariesToBuildFetch: LocalizedDictionaryOutput = {};

    for (const key of keysToBuildFetch) {
      if (dynamicDictionaries[key]) {
        dictionariesToBuildFetch[key] = dynamicDictionaries[key];
      }
    }

    if (Object.keys(dictionariesToBuildFetch).length > 0) {
      fetchDictionaries = await writeFetchDictionary(
        dictionariesToBuildFetch,
        configuration,
        formats
      );
    }
  }

  return {
    unmergedDictionaries,
    mergedDictionaries,
    dynamicDictionaries,
    fetchDictionaries,
  };
};
