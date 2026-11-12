'use client';

import { usePushDictionaries, useWriteDictionary } from '@api/index';
import {
  useDictionariesRecordActions,
  useEditedContentActions,
} from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types/dictionary';

/** Where a dictionary is saved: the CMS, or its local `.content` file. */
export type DictionarySaveTarget = 'remote' | 'local';

/**
 * Saves an edited dictionary, then promotes it to the saved state and drops
 * its pending edits. Errors are reported by the mutation toasts.
 *
 * @example
 * ```tsx
 * const { saveDictionary, isPushing } = useDictionarySave();
 * const isSaved = await saveDictionary(dictionary, 'remote');
 * ```
 */
export const useDictionarySave = () => {
  const { setLocaleDictionary } = useDictionariesRecordActions();
  const { restoreEditedContent } = useEditedContentActions();
  const { mutateAsync: pushDictionaries, isPending: isPushing } =
    usePushDictionaries();
  const { mutateAsync: writeDictionary, isPending: isWriting } =
    useWriteDictionary();

  /** Resolves whether the dictionary was saved. */
  const saveDictionary = async (
    dictionary: Dictionary,
    target: DictionarySaveTarget
  ): Promise<boolean> => {
    try {
      if (target === 'remote') {
        const result = await pushDictionaries({ dictionaries: [dictionary] });

        if (!result) return false;
      } else {
        await writeDictionary({ dictionary });
      }
    } catch {
      return false;
    }

    setLocaleDictionary(dictionary);
    if (dictionary.localId) restoreEditedContent(dictionary.localId);

    return true;
  };

  return {
    saveDictionary,
    isPushing,
    isWriting,
    isSaving: isPushing || isWriting,
  };
};
