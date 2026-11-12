import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';

/** An edited dictionary that differs from its saved version. */
export type ModifiedDictionary = {
  localId: LocalDictionaryId;
  /** Saved dictionary, absent when it only exists as an edit. */
  originalDictionary: Dictionary | undefined;
  /** Saved dictionary with the edits applied, ready to save. */
  dictionaryToSave: Dictionary;
};

/** Whether the edited dictionary differs from its saved version. */
export const isDictionaryEdited = (
  editedDictionary: Dictionary | undefined,
  originalDictionary: Dictionary | undefined
): boolean =>
  Boolean(editedDictionary) &&
  JSON.stringify(editedDictionary) !== JSON.stringify(originalDictionary);

/** Saved dictionary with its edits applied. */
export const mergeDictionaryEdits = (
  originalDictionary: Dictionary | undefined,
  editedDictionary: Dictionary
): Dictionary =>
  originalDictionary
    ? { ...originalDictionary, ...editedDictionary }
    : editedDictionary;

/**
 * Lists the edited dictionaries that differ from their saved version.
 *
 * @param editedContent - Edited dictionaries, by local id.
 * @param originalDictionaries - Saved dictionaries, by local id.
 */
export const getModifiedDictionaries = (
  editedContent: Record<LocalDictionaryId, Dictionary> | undefined,
  originalDictionaries: Record<string, Dictionary>
): ModifiedDictionary[] =>
  Object.entries<Dictionary>(editedContent ?? {}).flatMap(
    ([localId, editedDictionary]) => {
      const originalDictionary = originalDictionaries[localId];

      if (!isDictionaryEdited(editedDictionary, originalDictionary)) return [];

      return [
        {
          localId: localId as LocalDictionaryId,
          originalDictionary,
          dictionaryToSave: mergeDictionaryEdits(
            originalDictionary,
            editedDictionary
          ),
        },
      ];
    }
  );
