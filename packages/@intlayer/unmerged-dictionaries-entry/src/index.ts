/**
 * @intlayer/unmerged-dictionaries-entry is a package that only returns the unmerged dictionary entry file.
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
import type { Dictionary, IntlayerDictionaryTypesConnector } from 'intlayer';

export const getUnmergedDictionaries = (
  configuration: IntlayerConfig = getConfiguration()
) => {
  const { content, build } = configuration;

  // Always use cjs for dictionaries entry as it uses require
  const dictionariesPath = join(content.mainDir, `unmerged_dictionaries.cjs`);
  let dictionaries: Record<
    IntlayerDictionaryTypesConnector['key'],
    Dictionary[]
  > = {};

  if (existsSync(dictionariesPath)) {
    // Clear cache for unmerged_dictionaries.cjs and all its dependencies (JSON files)
    clearModuleCache(dictionariesPath);
    dictionaries = build.require(dictionariesPath);
  }

  return dictionaries;
};

export default (() => getUnmergedDictionaries())();
