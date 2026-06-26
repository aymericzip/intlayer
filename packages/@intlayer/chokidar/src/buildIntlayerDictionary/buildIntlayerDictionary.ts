import { IMPORT_MODE, OUTPUT_FORMAT } from '@intlayer/config/defaultValues';
import { colorizeKey, getAppLogger } from '@intlayer/config/logger';
import { isQualifiedDictionaryGroup } from '@intlayer/core/dictionaryManipulator';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { readDictionariesFromDisk } from '../utils/readDictionariesFromDisk';
import {
  type LocalizedDictionaryOutput,
  type QualifiedMergedDictionaryOutput,
  writeDynamicDictionary,
  writeDynamicQualifiedDictionaries,
} from './writeDynamicDictionary';
import { writeFetchDictionary } from './writeFetchDictionary';
import {
  type PlainMergedDictionaryOutput,
  writeMergedDictionaries,
} from './writeMergedDictionary';
import { writeUnmergedDictionaries } from './writeUnmergedDictionary';

export type BuildDictionariesOptions = Partial<{
  formats: typeof OUTPUT_FORMAT;
  importOtherDictionaries: boolean;
  env: 'prod' | 'dev';
}>;

const defaultOptions = {
  formats: OUTPUT_FORMAT,
  importOtherDictionaries: true,
  env: 'dev',
} as const satisfies BuildDictionariesOptions;

/**
 * This function transpile the bundled code to to make dictionaries as JSON files
 */
export const buildDictionary = async (
  localDictionariesEntries: Dictionary[],
  configuration: IntlayerConfig,
  options?: BuildDictionariesOptions
) => {
  const importMode =
    configuration?.build?.importMode ??
    configuration?.dictionary?.importMode ??
    IMPORT_MODE;

  const { importOtherDictionaries, env, formats } = {
    ...defaultOptions,
    ...options,
  };

  const unmergedDictionariesToUpdate: Dictionary[] = [
    ...localDictionariesEntries,
  ];

  if (importOtherDictionaries) {
    const prevUnmergedDictionaries: Record<string, Dictionary[]> =
      readDictionariesFromDisk(configuration.system.unmergedDictionariesDir);

    // Reinsert other dictionaries with the same key to avoid merging errors
    for (const dictionaryToWrite of localDictionariesEntries) {
      const allPrebuiltUnmergedDictionaries =
        prevUnmergedDictionaries[dictionaryToWrite.key]!;

      if (allPrebuiltUnmergedDictionaries?.length > 0) {
        // Do not add the same dictionary again by filtering out the one with the same localId
        const otherUnmergedDictionaries =
          allPrebuiltUnmergedDictionaries?.filter(
            (unmergedDictionary) =>
              unmergedDictionary.localId !== dictionaryToWrite.localId
          );

        unmergedDictionariesToUpdate.push(...(otherUnmergedDictionaries ?? []));
      }
    }
  }

  const unmergedDictionaries = await writeUnmergedDictionaries(
    unmergedDictionariesToUpdate,
    configuration,
    env
  );

  const mergedDictionaries = await writeMergedDictionaries(
    unmergedDictionaries,
    configuration
  );

  const dictionariesToBuildDynamic: PlainMergedDictionaryOutput = {};
  const qualifiedDictionariesToBuildDynamic: QualifiedMergedDictionaryOutput =
    {};
  const keysToBuildFetch = new Set<string>();

  for (const [key, mergedResult] of Object.entries(mergedDictionaries)) {
    const dictionary = mergedResult.dictionary;

    if (isQualifiedDictionaryGroup(dictionary)) {
      // Collections / variants resolve their qualifier at
      // runtime from a selector. Static mode keeps every entry in one JSON;
      // dynamic mode splits them into one chunk per (locale, qualifierId).
      const entryMode = dictionary.importMode ?? importMode;

      if (entryMode === 'dynamic') {
        qualifiedDictionariesToBuildDynamic[key] = {
          dictionaryPath: mergedResult.dictionaryPath,
          dictionary,
        };
      } else if (entryMode === 'fetch') {
        const appLogger = getAppLogger(configuration);
        appLogger(
          `Dictionary ${colorizeKey(key)} uses 'fetch' import mode with (${dictionary.qualifierTypes.join(', ')}) entries — fetch mode is not qualifier-aware yet, falling back to static import.`,
          { level: 'warn' }
        );
      }

      continue;
    }

    const mode = dictionary.importMode ?? importMode;

    if (mode === 'dynamic' || mode === 'fetch') {
      dictionariesToBuildDynamic[key] = {
        dictionaryPath: mergedResult.dictionaryPath,
        dictionary,
      };
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

  if (Object.keys(qualifiedDictionariesToBuildDynamic).length > 0) {
    await writeDynamicQualifiedDictionaries(
      qualifiedDictionariesToBuildDynamic,
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
