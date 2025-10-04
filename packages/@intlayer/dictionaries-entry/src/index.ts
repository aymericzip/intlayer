/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  clearModuleCache,
  ESMxCJSRequire,
  getConfiguration,
  type IntlayerConfig,
} from '@intlayer/config';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';

export const getDictionaries = (
  configuration: IntlayerConfig = getConfiguration(),
  projectRequire = ESMxCJSRequire
) => {
  const { content } = configuration;

  // Always use cjs for dictionaries entry as it uses require
  const dictionariesPath = join(content.mainDir, `dictionaries.cjs`);

  let dictionaries = {};
  if (existsSync(dictionariesPath)) {
    // Clear cache for dictionaries.cjs and all its dependencies (JSON files)
    clearModuleCache(dictionariesPath);

    dictionaries = projectRequire(dictionariesPath);
  }

  return (dictionaries ?? {}) as Record<
    IntlayerDictionaryTypesConnector['key'],
    IntlayerDictionaryTypesConnector
  >;
};

export default (() => getDictionaries())();
