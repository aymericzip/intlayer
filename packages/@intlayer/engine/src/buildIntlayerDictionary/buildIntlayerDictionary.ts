import { IMPORT_MODE, OUTPUT_FORMAT } from '@intlayer/config/defaultValues';
import { colorizeKey, getAppLogger } from '@intlayer/config/logger';
import {
  getNestedDictionaryGraph,
  isQualifiedDictionaryGroup,
} from '@intlayer/core/dictionaryManipulator';
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
import { writeNestedDictionaries } from './writeNestedDictionary';
import { writeUnmergedDictionaries } from './writeUnmergedDictionary';

export type BuildDictionariesOptions = Partial<{
  formats: typeof OUTPUT_FORMAT;
  importOtherDictionaries: boolean;
  env: 'prod' | 'dev';
  failOnSchemaError?: boolean;
}>;

const defaultOptions = {
  formats: OUTPUT_FORMAT,
  importOtherDictionaries: true,
  env: 'dev',
} as const satisfies BuildDictionariesOptions;

/**
 * Appends the already-built declarations sharing a key with
 * `localDictionaries` (other `localId`), so a partial rebuild does not drop
 * the declarations coming from other content files.
 */
export const addStoredSiblingDictionaries = (
  localDictionaries: Dictionary[],
  configuration: IntlayerConfig
): Dictionary[] => {
  const storedUnmergedDictionaries: Record<string, Dictionary[]> =
    readDictionariesFromDisk(configuration.system.unmergedDictionariesDir);

  const siblingDictionaries = localDictionaries.flatMap((localDictionary) =>
    (storedUnmergedDictionaries[localDictionary.key] ?? []).filter(
      (storedDictionary) => storedDictionary.localId !== localDictionary.localId
    )
  );

  return [...localDictionaries, ...siblingDictionaries];
};

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

  // Reinsert other dictionaries with the same key to avoid merging errors
  const unmergedDictionariesToUpdate: Dictionary[] = importOtherDictionaries
    ? addStoredSiblingDictionaries(localDictionariesEntries, configuration)
    : [...localDictionariesEntries];

  const unmergedDictionaries = await writeUnmergedDictionaries(
    unmergedDictionariesToUpdate,
    configuration,
    env,
    options?.failOnSchemaError
  );

  const mergedDictionaries = await writeMergedDictionaries(
    unmergedDictionaries,
    configuration
  );

  // `nest()` dependency graph, read back from disk so it stays complete on
  // incremental rebuilds where only a subset of dictionaries was regenerated.
  // Every artifact kind attaches its dependencies, letting `getNesting` resolve
  // them locally instead of through the registry the optimizer strips.
  const nestedDictionaryGraph = getNestedDictionaryGraph(
    Object.values(
      readDictionariesFromDisk<Record<string, Dictionary>>(
        configuration.system.dictionariesDir
      )
    )
  );

  await writeNestedDictionaries(nestedDictionaryGraph, configuration, formats);

  const dictionariesToBuildDynamic: PlainMergedDictionaryOutput = {};
  const qualifiedDictionariesToBuildDynamic: QualifiedMergedDictionaryOutput =
    {};
  const keysToBuildFetch = new Set<string>();

  // Per-locale chunks are emitted for every dictionary, whatever its import
  // mode: `getIntlayerAsync` is rewritten to them in every mode, and `nest()`
  // targets of a lazily loaded dictionary resolve through them. A chunk no
  // call site imports never reaches a bundle.
  for (const [key, mergedResult] of Object.entries(mergedDictionaries)) {
    const dictionary = mergedResult.dictionary;
    const mode = dictionary.importMode ?? importMode;

    if (isQualifiedDictionaryGroup(dictionary)) {
      // Collections / variants resolve their qualifier at runtime from a
      // selector: one chunk per (locale, qualifierId).
      qualifiedDictionariesToBuildDynamic[key] = {
        dictionaryPath: mergedResult.dictionaryPath,
        dictionary,
      };

      if (mode === 'fetch') {
        const appLogger = getAppLogger(configuration);
        appLogger(
          `Dictionary ${colorizeKey(key)} uses 'fetch' import mode with (${dictionary.qualifierTypes.join(', ')}) entries — fetch mode is not qualifier-aware yet, falling back to static import.`,
          { level: 'warn' }
        );
      }

      continue;
    }

    dictionariesToBuildDynamic[key] = {
      dictionaryPath: mergedResult.dictionaryPath,
      dictionary,
    };

    if (mode === 'fetch') {
      keysToBuildFetch.add(key);
    }
  }

  let dynamicDictionaries: LocalizedDictionaryOutput | null = null;

  if (Object.keys(dictionariesToBuildDynamic).length > 0) {
    dynamicDictionaries = await writeDynamicDictionary(
      dictionariesToBuildDynamic,
      configuration,
      formats,
      nestedDictionaryGraph
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
        formats,
        nestedDictionaryGraph
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
