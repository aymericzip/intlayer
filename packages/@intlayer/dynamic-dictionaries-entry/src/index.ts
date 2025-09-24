// @ts-nocheck intlayer declared for module augmentation

/**
 * @intlayer/dynamic-dictionaries-entry is a package that only returns the dynamic dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import {
  clearModuleCache,
  ESMxCJSRequire,
  getConfiguration,
  type IntlayerConfig,
} from '@intlayer/config';
import { existsSync } from 'fs';
import {
  Dictionary,
  IntlayerDictionaryTypesConnector,
  LanguageContent,
} from 'intlayer';
import { join } from 'path';

export const getDynamicDictionaries = (
  configuration: IntlayerConfig = getConfiguration(),
  projectRequire = ESMxCJSRequire
) => {
  const { content } = configuration;

  // Always use cjs for dictionaries entry as it uses require
  const dictionariesPath = join(content.mainDir, `dynamic_dictionaries.cjs`);

  let dictionaries: Record<
    IntlayerDictionaryTypesConnector['key'],
    LanguageContent<Dictionary>
  > = {};

  if (existsSync(dictionariesPath)) {
    // Clear cache for dynamic_dictionaries.cjs and all its dependencies (JSON files)
    clearModuleCache(dictionariesPath);
    dictionaries = projectRequire(dictionariesPath);
  }

  return dictionaries;
};

export default (() => getDynamicDictionaries())();
