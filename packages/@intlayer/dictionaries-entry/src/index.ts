/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { ESMxCJSRequire, getConfiguration } from '@intlayer/config';
import { existsSync } from 'fs';
import { join } from 'path';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';

export const getDictionaries = () => {
  const { content } = getConfiguration();
  const isESModule = typeof import.meta.url === 'string';
  const extension = isESModule ? 'mjs' : 'cjs';

  const dictionariesPath = join(content.mainDir, `dictionaries.${extension}`);

  let dictionaries = {};
  if (existsSync(dictionariesPath)) {
    delete ESMxCJSRequire.cache[dictionariesPath];

    dictionaries = ESMxCJSRequire(dictionariesPath);
  }

  return (dictionaries ?? {}) as Record<
    IntlayerDictionaryTypesConnector['key'],
    IntlayerDictionaryTypesConnector
  >;
};

export default getDictionaries();
