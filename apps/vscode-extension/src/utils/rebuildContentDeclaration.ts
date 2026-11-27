import {
  clearAllCache,
  clearDiskCacheMemory,
  clearModuleCache,
} from '@intlayer/config/utils';
import {
  buildDictionary,
  createTypes,
  handleContentDeclarationFilesChange,
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

/**
 * Rebuild a batch of edited content declaration files as the engine's watcher
 * does: their dictionaries, types and entry points once for the whole batch,
 * and the built output of every key they no longer declare removed — so a
 * renamed key leaves no stale dictionary behind.
 */
export const rebuildContentDeclarations = async (
  filePaths: string[],
  configuration: IntlayerConfig
): Promise<void> => {
  for (const filePath of filePaths) clearModuleCache(filePath);

  clearAllCache();
  clearDiskCacheMemory();

  await handleContentDeclarationFilesChange(filePaths, configuration);
};
