// @ts-nocheck intlayer declared for module augmentation

/**
 * @intlayer/dynamic-dictionaries-entry is a package that only returns the dynamic dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { ESMxCJSRequire, getConfiguration } from '@intlayer/config';
import { existsSync } from 'fs';
import {
  Dictionary,
  IntlayerDictionaryTypesConnector,
  LanguageContent,
} from 'intlayer';
import { join } from 'path';

export const getDynamicDictionaries = () => {
  const { content } = getConfiguration();

  const dictionariesPath = join(content.mainDir, 'dynamic_dictionaries.cjs');
  let dictionaries: Record<
    IntlayerDictionaryTypesConnector['key'],
    LanguageContent<Dictionary>
  > = {};

  if (existsSync(dictionariesPath)) {
    delete ESMxCJSRequire.cache[dictionariesPath];
    dictionaries = ESMxCJSRequire(dictionariesPath);
  }

  return dictionaries;
};

export default (() => getDynamicDictionaries())();
