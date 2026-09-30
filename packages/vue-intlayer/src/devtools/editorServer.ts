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
   *
   * Declarations written through this session shadow the fetched ones until
   * the server-side content catches up: the editor server regenerates the
   * unmerged dictionary files asynchronously (file watcher), so a fetch right
   * after a write would otherwise briefly return the pre-edit content and
   * make the panel display revert. Shadows expire after a short delay so an
   * external edit of the source file cannot stay hidden forever.
   */
  fetchUnmergedDictionaries: () => Promise<UnmergedDictionaries | null>;
  /**
   * Write a full declaration back to its source file through the editor
   * server (`POST /api/dictionary`). The declaration must carry the `localId`
   * (and `filePath`) it was fetched with, so the server can locate the source
   * file.
   */
  writeDictionary: (dictionary: Dictionary) => Promise<void>;
};

/**
 * How long a written declaration shadows the server-side content. The editor
 * server regenerates the unmerged dictionary files asynchronously (file
 * watcher), so a fetch right after a write would briefly return the pre-edit
 * content; past this delay the server content is trusted again.
 */
const WRITTEN_SHADOW_TTL_MS = 10_000;

export const createEditorServerSession = (): EditorServerSession => {
  // The editor server answers with `Access-Control-Allow-Origin: *`, which
  // browsers reject for credentialed requests — and the server needs no
  // credentials anyway (it only serves local, unauthenticated endpoints).
  const editorAPI = getEditorAPI({ credentials: 'omit' });
  let online = false;
  const writtenDeclarations = new Map<
    string,
    { dictionary: Dictionary; writtenAt: number }
  >();

  const fetchUnmergedDictionaries =
    async (): Promise<UnmergedDictionaries | null> => {
      let unmergedDictionaries: UnmergedDictionaries;

      try {
        // The upstream return type is the response envelope, but the runtime
        // value is the unmerged dictionaries record itself.
        unmergedDictionaries =
          (await editorAPI.getDictionaries()) as unknown as UnmergedDictionaries;
        online = true;
      } catch {
        online = false;
        return null;
      }

      // Build a fresh record rather than mutating the fetched one: the
      // shadow substitution must not leak into the API client's response
      // object, which callers may reuse across fetches.
      const resolvedDictionaries: UnmergedDictionaries = {};

      for (const [dictionaryKey, declarations] of Object.entries(
        unmergedDictionaries
      )) {
        resolvedDictionaries[dictionaryKey] = declarations.map(
          (declaration) => {
            const localId = declaration.localId;

            if (!localId) return declaration;

            const written = writtenDeclarations.get(localId);

            if (!written) return declaration;

            const serverCaughtUp =
              JSON.stringify(declaration.content) ===
              JSON.stringify(written.dictionary.content);

            // Stop shadowing once the regenerated files caught up with the
            // write — or once the shadow expires: without an expiry, an
            // external edit of the source file (different content) would stay
            // hidden behind the stale shadow forever.
            if (
              serverCaughtUp ||
              Date.now() - written.writtenAt > WRITTEN_SHADOW_TTL_MS
            ) {
              writtenDeclarations.delete(localId);
              return declaration;
            }

            return written.dictionary;
          }
        );
      }

      return resolvedDictionaries;
    };

  const writeDictionary = async (dictionary: Dictionary): Promise<void> => {
    await editorAPI.writeDictionary({ dictionary });

    if (dictionary.localId) {
      writtenDeclarations.set(dictionary.localId, {
        dictionary,
        writtenAt: Date.now(),
      });
    }
  };

  return {
    isOnline: () => online,
    fetchUnmergedDictionaries,
    writeDictionary,
  };
};
