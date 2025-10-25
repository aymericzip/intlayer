/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry file.
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
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';

export type Dictionaries = Record<
  IntlayerDictionaryTypesConnector['key'],
  IntlayerDictionaryTypesConnector
>;

type GetDictionaries = (configuration?: IntlayerConfig) => Dictionaries;

export const getDictionaries: GetDictionaries = (
  configuration = getConfiguration()
) => {
  const { content, build } = configuration;

  // Always use cjs for dictionaries entry as it uses require
  const dictionariesPath = join(content.mainDir, `dictionaries.cjs`);

  let dictionaries = {};
  if (existsSync(dictionariesPath)) {
    // Clear cache for dictionaries.cjs and all its dependencies (JSON files)
    clearModuleCache(dictionariesPath);

    dictionaries = build.require(dictionariesPath);
  }

  return (dictionaries ?? {}) as Record<
    IntlayerDictionaryTypesConnector['key'],
    IntlayerDictionaryTypesConnector
  >;
};
