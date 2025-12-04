import { isAbsolute, join } from 'node:path';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import fg from 'fast-glob';
import type { OptimizePluginOptions } from './babel-plugin-intlayer-optimize';

type GetOptimizePluginOptionsParams = {
  /**
   * Configuration options for loading intlayer config
   */
  configOptions?: GetConfigurationOptions;
  /**
   * Pre-loaded dictionaries (optional - will be loaded if not provided)
   */
  dictionaries?: Dictionary[];
  /**
   * Override specific options
   */
  overrides?: Partial<OptimizePluginOptions>;
};

/**
 * Load dictionaries from the dictionaries-entry package
 */
const loadDictionaries = (config: IntlayerConfig): Dictionary[] => {
  try {
    // Dynamic require to avoid build-time dependency issues
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getDictionaries } = require('@intlayer/dictionaries-entry');
    const dictionariesRecord = getDictionaries(config) as Record<
      string,
      Dictionary
    >;
    return Object.values(dictionariesRecord);
  } catch {
    // If dictionaries-entry is not available, return empty array
    return [];
  }
};

/**
 * Get the options for the Intlayer Babel optimization plugin
 * This function loads the Intlayer configuration and returns the paths
 * needed for dictionary optimization and import rewriting.
 */
export const getOptimizePluginOptions = (
  params?: GetOptimizePluginOptionsParams
): OptimizePluginOptions => {
  const {
    configOptions,
    dictionaries: providedDictionaries,
    overrides,
  } = params ?? {};

  const config = getConfiguration(configOptions);
  const {
    mainDir,
    baseDir,
    dictionariesDir,
    unmergedDictionariesDir,
    dynamicDictionariesDir,
    fetchDictionariesDir,
  } = config.content;
  const { importMode, traversePattern, optimize } = config.build;

  // Build files list from traverse pattern
  const filesListPattern = fg
    .sync(traversePattern, {
      cwd: baseDir,
    })
    .map((file) => {
      if (isAbsolute(file)) {
        return file;
      }
      return join(baseDir, file);
    });

  const dictionariesEntryPath = join(mainDir, 'dictionaries.mjs');
  const unmergedDictionariesEntryPath = join(
    mainDir,
    'unmerged_dictionaries.mjs'
  );
  const dynamicDictionariesEntryPath = join(
    mainDir,
    'dynamic_dictionaries.mjs'
  );
  const fetchDictionariesEntryPath = join(mainDir, 'fetch_dictionaries.mjs');

  const filesList = [
    ...filesListPattern,
    dictionariesEntryPath, // should add dictionariesEntryPath to replace it by an empty object if import made dynamic
    unmergedDictionariesEntryPath, // should add dictionariesEntryPath to replace it by an empty object if import made dynamic
  ];

  // Load dictionaries if not provided
  const dictionaries = providedDictionaries ?? loadDictionaries(config);

  const liveSyncKeys = dictionaries
    .filter((dictionary) => dictionary.live)
    .map((dictionary) => dictionary.key);

  return {
    optimize,
    dictionariesDir,
    dictionariesEntryPath,
    unmergedDictionariesDir,
    unmergedDictionariesEntryPath,
    dynamicDictionariesDir,
    dynamicDictionariesEntryPath,
    fetchDictionariesDir,
    fetchDictionariesEntryPath,
    replaceDictionaryEntry: true,
    importMode,
    liveSyncKeys,
    filesList,
    ...overrides,
  };
};
