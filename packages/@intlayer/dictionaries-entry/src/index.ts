/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import {
  clearModuleCache,
  ESMxCJSRequire,
  getConfiguration,
  getExtension,
  type IntlayerConfig,
} from '@intlayer/config';
import { existsSync } from 'fs';
import { join } from 'path';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';

export const getDictionaries = (
  configuration: IntlayerConfig = getConfiguration()
) => {
  const { content } = configuration;

  const extension = getExtension(configuration);

  const dictionariesPath = join(content.mainDir, `dictionaries.${extension}`);

  let dictionaries = {};
  if (existsSync(dictionariesPath)) {
    // Clear cache for dictionaries.cjs and all its dependencies (JSON files)
    clearModuleCache(dictionariesPath);

    dictionaries = ESMxCJSRequire(dictionariesPath);
  }

  return (dictionaries ?? {}) as Record<
    IntlayerDictionaryTypesConnector['key'],
    IntlayerDictionaryTypesConnector
  >;
};

export default (() => getDictionaries())();
