import {
  getPushableDictionaries,
  type PushDictionariesProgressState,
  useGetDictionariesKeys,
  usePushDictionaries,
} from '@intlayer/design-system/api';
import {
  useDictionariesRecord,
  useEditedContent,
} from '@intlayer/editor-react';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { useEditorAuth } from '../components/EditorAuthProvider';

export type PushLocalDictionaries = {
  /**
   * Dictionaries of the application `intlayer push` would send (`remote`,
   * `hybrid` and custom locations), with their pending edits.
   */
  localDictionaries: Dictionary[];
  /**
   * Local dictionaries the CMS does not hold yet. Every local dictionary
   * while signed out, as the CMS cannot be asked.
   */
  missingDictionaries: Dictionary[];
  /** Pushes dictionaries, signing in first (browser flow) when signed out. */
  push: (dictionaries: Dictionary[]) => void;
  isPushing: boolean;
  /** Push requested while signed out, waiting for the sign-in to land. */
  isAwaitingLogin: boolean;
  /** Advancement of the last push, `null` before the first one. */
  progress: PushDictionariesProgressState | null;
};

/**
 * Pushes the application dictionaries to the CMS. Signed out, it runs the
 * `intlayer login` browser flow on the editor server, then pushes once the
 * session lands.
 */
export const usePushLocalDictionaries = (): PushLocalDictionaries => {
  const editorAuth = useEditorAuth();
  const isAuthenticated = Boolean(editorAuth?.auth);
  const isLoggingIn = Boolean(editorAuth?.isLoggingIn);

  const { localeDictionaries, setLocaleDictionary } = useDictionariesRecord();
  const { editedContent, restoreEditedContent } = useEditedContent();
  const {
    mutate: pushDictionaries,
    isPending,
    progress,
  } = usePushDictionaries();
  const { data: remoteKeysResult } = useGetDictionariesKeys({
    enabled: isAuthenticated,
  });

  // Push requested while signed out, sent once the sign-in lands
  const [dictionariesAwaitingLogin, setDictionariesAwaitingLogin] = useState<
    Dictionary[] | null
  >(null);

  const localDictionaries = useMemo(
    () =>
      getPushableDictionaries(Object.values(localeDictionaries ?? {})).map(
        (dictionary) => {
          const editedDictionary =
            editedContent?.[dictionary.localId as LocalDictionaryId];

          return editedDictionary
            ? { ...dictionary, ...editedDictionary }
            : dictionary;
        }
      ),
    [localeDictionaries, editedContent]
  );

  const missingDictionaries = useMemo(() => {
    const remoteKeys = remoteKeysResult?.data;

    if (!isAuthenticated || !remoteKeys) return localDictionaries;

    const remoteKeySet = new Set(remoteKeys);

    return localDictionaries.filter(
      (dictionary) => !remoteKeySet.has(dictionary.key)
    );
  }, [isAuthenticated, remoteKeysResult, localDictionaries]);

  const pushNow = useCallback(
    (dictionaries: Dictionary[]) => {
      if (dictionaries.length === 0) return;

      pushDictionaries(
        { dictionaries },
        {
          onSuccess: (result) => {
            const failedLocalIds = new Set(
              (result.data?.error ?? []).map(({ localId }) => localId)
            );

            for (const dictionary of dictionaries) {
              const localId = dictionary.localId as LocalDictionaryId;

              if (failedLocalIds.has(localId) || !editedContent?.[localId]) {
                continue;
              }

              setLocaleDictionary(dictionary);
              restoreEditedContent(localId);
            }
          },
        }
      );
    },
    [pushDictionaries, editedContent, setLocaleDictionary, restoreEditedContent]
  );

  const push = useCallback(
    (dictionaries: Dictionary[]) => {
      if (isAuthenticated || !editorAuth) {
        pushNow(dictionaries);
        return;
      }

      setDictionariesAwaitingLogin(dictionaries);
      editorAuth.login();
    },
    [isAuthenticated, editorAuth, pushNow]
  );

  useEffect(() => {
    if (!dictionariesAwaitingLogin) return;

    if (isAuthenticated) {
      setDictionariesAwaitingLogin(null);
      pushNow(dictionariesAwaitingLogin);
    } else if (!isLoggingIn) {
      // Sign-in abandoned: drop the push instead of firing it later
      setDictionariesAwaitingLogin(null);
    }
  }, [dictionariesAwaitingLogin, isAuthenticated, isLoggingIn, pushNow]);

  return {
    localDictionaries,
    missingDictionaries,
    push,
    isPushing: isPending || dictionariesAwaitingLogin !== null,
    isAwaitingLogin: dictionariesAwaitingLogin !== null,
    progress,
  };
};
