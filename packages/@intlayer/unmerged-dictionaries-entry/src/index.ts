/**
 * @intlayer/unmerged-dictionaries-entry is a package that only returns the unmerged dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { ESMxCJSRequire, getConfiguration, isESModule } from '@intlayer/config';
import { existsSync } from 'fs';
import { join } from 'path';
// @ts-ignore intlayer declared for module augmentation
import type { Dictionary, IntlayerDictionaryTypesConnector } from 'intlayer';

export const getUnmergedDictionaries = () => {
  const { content } = getConfiguration();

  const dictionariesPath = join(
    content.mainDir,
    isESModule ? 'unmerged_dictionaries.mjs' : 'unmerged_dictionaries.cjs'
  );
  let dictionaries: Record<
    IntlayerDictionaryTypesConnector['key'],
    Dictionary[]
  > = {};

  if (existsSync(dictionariesPath)) {
    delete ESMxCJSRequire.cache[dictionariesPath];
    dictionaries = ESMxCJSRequire(dictionariesPath);
  }

  return dictionaries;
};

export default (() => getUnmergedDictionaries())();
