/**
 * @intlayer/fetch-dictionaries-entry is a package that only returns the fetch dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { clearModuleCache } from '@intlayer/config';
import config from '@intlayer/config/built';
import type {
  Dictionary,
  DictionaryKeys,
  IntlayerConfig,
  StrictModeLocaleMap,
} from '@intlayer/types';

export type FetchDictionaries = Record<
  DictionaryKeys,
  StrictModeLocaleMap<Dictionary>
>;

type GetFetchDictionaries = (
  configuration?: IntlayerConfig
) => FetchDictionaries;

export const getDynamicDictionaries: GetFetchDictionaries = (
  configuration: IntlayerConfig = config
) => {
  const { content, build } = configuration;

  // Always use cjs for dictionaries entry as it uses require
  const dictionariesPath = join(content.mainDir, `fetch_dictionaries.cjs`);
  let dictionaries: Record<
    DictionaryKeys,
    StrictModeLocaleMap<Dictionary>
  > = {};

  if (existsSync(dictionariesPath)) {
    // Clear cache for dynamic_dictionaries.cjs and all its dependencies (JSON files)
    clearModuleCache(dictionariesPath);
    dictionaries = build.require(dictionariesPath);
  }

  return dictionaries;
};
