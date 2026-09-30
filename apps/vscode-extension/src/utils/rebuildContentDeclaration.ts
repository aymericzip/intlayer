import {
  clearAllCache,
  clearDiskCacheMemory,
  clearModuleCache,
} from '@intlayer/config/utils';
import {
  buildDictionary,
  createTypes,
  loadLocalDictionaries,
} from '@intlayer/engine/build';
import type { IntlayerConfig } from '@intlayer/types';

/**
 * Rebuild the dictionaries declared by one content declaration file, and
 * regenerate their types.
 *
 * The file's module, the in-memory caches and the disk cache index are evicted
 * first — as the engine's watcher does — so the edited content is loaded
 * instead of the previous evaluation.
 *
 * @returns Whether the file declared any dictionary.
 */
export const rebuildContentDeclaration = async (
  filePath: string,
  configuration: IntlayerConfig
): Promise<boolean> => {
  clearModuleCache(filePath);
  clearAllCache();
  clearDiskCacheMemory();

  const localDictionaries = await loadLocalDictionaries(
    filePath,
    configuration
  );

  if (!localDictionaries.length) return false;

  const buildOutput = await buildDictionary(localDictionaries, configuration);
  const mergedDictionaries = Object.values(
    buildOutput?.mergedDictionaries ?? {}
  ).map(({ dictionary }) => dictionary);

  await createTypes(mergedDictionaries, configuration);

  return true;
};
