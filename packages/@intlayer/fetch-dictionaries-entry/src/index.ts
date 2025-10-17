// @ts-nocheck intlayer declared for module augmentation

/**
 * @intlayer/fetch-dictionaries-entry is a package that only returns the fetch dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  clearModuleCache,
  getConfiguration,
  type IntlayerConfig,
} from '@intlayer/config';
import type {
  Dictionary,
  IntlayerDictionaryTypesConnector,
  LanguageContent,
} from 'intlayer';

export type FetchDictionaries = Record<
  IntlayerDictionaryTypesConnector['key'],
  LanguageContent<Dictionary>
>;

type GetFetchDictionaries = (
  configuration?: IntlayerConfig
) => FetchDictionaries;

export const getDynamicDictionaries: GetFetchDictionaries = (
  configuration = getConfiguration()
) => {
  const { content, build } = configuration;

  // Always use cjs for dictionaries entry as it uses require
  const dictionariesPath = join(content.mainDir, `fetch_dictionaries.cjs`);
  let dictionaries: Record<
    IntlayerDictionaryTypesConnector['key'],
    LanguageContent<Dictionary>
  > = {};

  if (existsSync(dictionariesPath)) {
    // Clear cache for dynamic_dictionaries.cjs and all its dependencies (JSON files)
    clearModuleCache(dictionariesPath);
    dictionaries = build.require(dictionariesPath);
  }

  return dictionaries;
};
