/**
 * @intlayer/unmerged-dictionaries-entry is a package that only returns the unmerged dictionary entry file.
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
import type { Dictionary, IntlayerDictionaryTypesConnector } from 'intlayer';

export const getUnmergedDictionaries = (
  configuration: IntlayerConfig = getConfiguration()
) => {
  const { content } = configuration;

  const extension = getExtension(configuration);

  const dictionariesPath = join(
    content.mainDir,
    `unmerged_dictionaries.${extension}`
  );
  let dictionaries: Record<
    IntlayerDictionaryTypesConnector['key'],
    Dictionary[]
  > = {};

  if (existsSync(dictionariesPath)) {
    // Clear cache for unmerged_dictionaries.cjs and all its dependencies (JSON files)
    clearModuleCache(dictionariesPath);
    dictionaries = ESMxCJSRequire(dictionariesPath);
  }

  return dictionaries;
};

export default (() => getUnmergedDictionaries())();
