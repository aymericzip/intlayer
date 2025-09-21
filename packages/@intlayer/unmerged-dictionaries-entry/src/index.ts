/**
 * @intlayer/unmerged-dictionaries-entry is a package that only returns the unmerged dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import {
  ESMxCJSRequire,
  getConfiguration,
  type IntlayerConfig,
} from '@intlayer/config';
import { existsSync } from 'fs';
import { join } from 'path';
// @ts-ignore intlayer declared for module augmentation
import type { Dictionary, IntlayerDictionaryTypesConnector } from 'intlayer';

/**
 * Recursively clears the require cache for a module and all its dependencies
 */
const clearModuleCache = (modulePath: string, visited = new Set<string>()) => {
  // Avoid infinite loops
  if (visited.has(modulePath)) {
    return;
  }
  visited.add(modulePath);

  try {
    const resolvedPath = ESMxCJSRequire.resolve(modulePath);

    // Get the cached module
    const cachedModule = ESMxCJSRequire.cache[resolvedPath];

    if (cachedModule) {
      // Clear cache for all children (dependencies) first
      if (cachedModule.children) {
        cachedModule.children.forEach((child) => {
          clearModuleCache(child.filename, visited);
        });
      }

      // Clear the cache for this module
      delete ESMxCJSRequire.cache[resolvedPath];
    }
  } catch (error) {
    // Module might not exist or be resolvable, skip it
    console.warn(`Could not clear cache for module: ${modulePath}`, error);
  }
};

export const getUnmergedDictionaries = (
  configuration: IntlayerConfig = getConfiguration()
) => {
  const { content } = configuration;

  const dictionariesPath = join(content.mainDir, 'unmerged_dictionaries.cjs');
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
