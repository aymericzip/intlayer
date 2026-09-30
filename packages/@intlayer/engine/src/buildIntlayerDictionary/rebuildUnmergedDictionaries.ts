import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { loadLocalDictionaries } from '../loadDictionaries/loadLocalDictionaries';
import { addStoredSiblingDictionaries } from './buildIntlayerDictionary';
import { writeUnmergedDictionaries } from './writeUnmergedDictionary';

/**
 * Reloads a content declaration file and rewrites only the unmerged
 * dictionaries of its keys. Used by the editor server right after writing a
 * source file, so the next read reflects the write without waiting for the
 * app watcher (which still owns the merged / dynamic / type outputs).
 *
 * @returns The reloaded declarations of the file.
 */
export const rebuildUnmergedDictionaries = async (
  contentDeclarationPath: string,
  configuration: IntlayerConfig
): Promise<Dictionary[]> => {
  const localDictionaries = await loadLocalDictionaries(
    contentDeclarationPath,
    configuration
  );

  await writeUnmergedDictionaries(
    addStoredSiblingDictionaries(localDictionaries, configuration),
    configuration,
    'dev'
  );

  return localDictionaries;
};
