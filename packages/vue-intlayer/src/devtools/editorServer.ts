import { getEditorAPI } from '@intlayer/api/editor';
import type { Dictionary } from '@intlayer/types/dictionary';

/**
 * Unmerged dictionaries as returned by the editor server: one array of
 * declarations per dictionary key. Declared locally — rather than importing
 * `GetEditorDictionariesResult` from `intlayer-editor` — to keep the
 * published types of vue-intlayer free of a dependency on the editor package.
 */
export type UnmergedDictionaries = Record<string, Dictionary[]>;

export type EditorServerSession = {
  /** Whether the last fetch reached the editor server. */
  isOnline: () => boolean;
  /**
   * Fetch the unmerged dictionaries from the editor server, or `null` when
   * the server is unreachable (`npx intlayer editor start` not running).
   */
  fetchUnmergedDictionaries: () => Promise<UnmergedDictionaries | null>;
  /**
   * Write a full declaration back to its source file through the editor
   * server (`POST /api/dictionary`). The declaration must carry the `localId`
   * (and `filePath`) it was fetched with, so the server can locate the source
   * file. The server rebuilds the unmerged dictionaries before answering, so
   * a fetch after the returned promise resolves reflects the write.
   */
  writeDictionary: (dictionary: Dictionary) => Promise<void>;
};

export const createEditorServerSession = (): EditorServerSession => {
  // The editor server answers with `Access-Control-Allow-Origin: *`, which
  // browsers reject for credentialed requests — and the server needs no
  // credentials anyway (it only serves local, unauthenticated endpoints).
  const editorAPI = getEditorAPI({ credentials: 'omit' });
  let online = false;

  const fetchUnmergedDictionaries =
    async (): Promise<UnmergedDictionaries | null> => {
      try {
        // The upstream return type is the response envelope, but the runtime
        // value is the unmerged dictionaries record itself.
        const unmergedDictionaries =
          (await editorAPI.getDictionaries()) as unknown as UnmergedDictionaries;
        online = true;

        return unmergedDictionaries;
      } catch {
        online = false;
        return null;
      }
    };

  const writeDictionary = async (dictionary: Dictionary): Promise<void> => {
    await editorAPI.writeDictionary({ dictionary });
  };

  return {
    isOnline: () => online,
    fetchUnmergedDictionaries,
    writeDictionary,
  };
};
