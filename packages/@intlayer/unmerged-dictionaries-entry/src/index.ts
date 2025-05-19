/**
 * @intlayer/unmerged-dictionaries-entry is a package that only returns the unmerged dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { ESMxCJSRequire, getConfiguration } from '@intlayer/config';
import { existsSync } from 'fs';
import { join } from 'path';
// @ts-ignore intlayer declared for module augmentation
import type { Dictionary, IntlayerDictionaryTypesConnector } from 'intlayer';

export const getUnmergedDictionaries = () => {
  const { content } = getConfiguration();
  const isESModule = typeof import.meta.url === 'string';
  const extension = isESModule ? 'mjs' : 'cjs';

  const dictionariesPath = join(
    content.mainDir,
    `unmerged_dictionaries.${extension}`
  );

  let dictionaries: Record<
    IntlayerDictionaryTypesConnector['key'],
    Dictionary[]
  > = {};

  if (existsSync(dictionariesPath)) {
    delete ESMxCJSRequire.cache[dictionariesPath];
    dictionaries = ESMxCJSRequire(dictionariesPath);
    console.log('getUnmergedDictionaries', dictionaries);
  }

  return dictionaries;
};

export default (() => getUnmergedDictionaries())();
