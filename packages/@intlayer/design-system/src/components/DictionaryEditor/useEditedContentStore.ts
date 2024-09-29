import type { Dictionary, DictionaryValue, KeyPath } from '@intlayer/core';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  editDictionaryByKeyPath,
  getDictionaryValueByKeyPath,
  removeDictionaryValueByKeyPath,
} from '../../utils/dictionary';

export type DictionaryContent = Record<Dictionary['id'], Dictionary>;

type EditedContentStore = {
  dictionariesRecord: DictionaryContent;
  editedContent: DictionaryContent;
  setDictionariesRecord: (
    dictionariesRecord: Record<Dictionary['id'], Dictionary>
  ) => void;
  addEditedContent: (
    dictionaryId: Dictionary['id'],
    newValue: DictionaryValue,
    keyPath?: KeyPath[],
    overwrite?: boolean
  ) => void;
  renameEditedContent: (
    dictionaryId: Dictionary['id'],
    newKey: KeyPath['key'],
    keyPath?: KeyPath[]
  ) => void;
  removeEditedContent: (
    dictionaryId: Dictionary['id'],
    keyPath: KeyPath[]
  ) => void;
  clearEditedDictionaryContent: (dictionaryId: Dictionary['id']) => void;
  clearEditedContent: () => void;
  getEditedContentValue: (
    dictionaryId: Dictionary['id'],
    keyPath: KeyPath[]
  ) => DictionaryValue | undefined;
};

export const useEditedContentStore = create(
  persist<EditedContentStore>(
    (set, get) => ({
      dictionariesRecord: {},
      editedContent: {},
      setDictionariesRecord: (dictionariesRecord) =>
        set(() => ({ dictionariesRecord })),
      addEditedContent: (
        dictionaryId,
        newValue,
        keyPath = [],
        overwrite = true
      ) =>
        set((state) => {
          const dictionaryContent = {
            ...state.dictionariesRecord[dictionaryId],
            ...state.editedContent[dictionaryId],
          };

          const newKeyPath: KeyPath[] = keyPath;

          if (!overwrite) {
            // Check if the key already exists, and increment the key if it does

            let isKeyExist = false;
            let index = 0;
            const otherKeyPath: KeyPath[] = keyPath.slice(0, -1);
            const lastKeyPath: KeyPath = keyPath[keyPath.length - 1];
            let finalKey = lastKeyPath.key;
            let newKeyPath: KeyPath[] = [
              ...otherKeyPath,
              { ...lastKeyPath, key: finalKey } as KeyPath,
            ];

            while (!isKeyExist) {
              const content = getDictionaryValueByKeyPath(
                dictionaryContent,
                newKeyPath
              );

              if (typeof content === 'undefined') {
                isKeyExist = true;
              } else {
                index++;
                finalKey =
                  index === 0
                    ? lastKeyPath.key
                    : `${lastKeyPath.key} (${index})`;

                newKeyPath = [
                  ...otherKeyPath,
                  { ...lastKeyPath, key: finalKey } as KeyPath,
                ];
              }
            }
          }

          const editedContent = editDictionaryByKeyPath(
            dictionaryContent,
            newKeyPath,
            newValue
          );

          return {
            editedContent: {
              ...state.editedContent,
              [dictionaryId]: editedContent,
            },
          };
        }),
      renameEditedContent: (dictionaryId, newKey, keyPath = []) => {
        set((state) => {
          const dictionaryContent = {
            ...state.dictionariesRecord[dictionaryId],
            ...state.editedContent[dictionaryId],
          };

          const lastKeyPath: KeyPath = keyPath[keyPath.length - 1];
          const otherKeyPath: KeyPath[] = keyPath.slice(0, -1);
          const newKeyPath: KeyPath[] = [
            ...otherKeyPath,
            { ...lastKeyPath, key: newKey } as KeyPath,
          ];

          // Get the original value
          const contentValue = getDictionaryValueByKeyPath(
            dictionaryContent,
            keyPath
          );

          // Add the new field
          const contentWithNewField = editDictionaryByKeyPath(
            dictionaryContent,
            newKeyPath,
            contentValue
          );

          // Remove the old field
          const editedContent = removeDictionaryValueByKeyPath(
            contentWithNewField,
            keyPath
          );

          return {
            editedContent: {
              ...state.editedContent,
              [dictionaryId]: editedContent,
            },
          };
        });
      },
      removeEditedContent: (dictionaryId, keyPath) => {
        set((state) => {
          const initialDictionary = state.dictionariesRecord[dictionaryId];
          const editedDictionary = {
            ...initialDictionary,
            ...state.editedContent[dictionaryId],
          };

          const initialContent = getDictionaryValueByKeyPath(
            initialDictionary,
            keyPath
          );

          const restoredContent = editDictionaryByKeyPath(
            editedDictionary,
            keyPath,
            initialContent
          );

          return {
            editedContent: {
              ...state.editedContent,
              [dictionaryId]: restoredContent,
            },
          };
        });
      },

      clearEditedDictionaryContent: (dictionaryId) => {
        set((state) => {
          const filteredEditedContent = Object.entries(
            state.editedContent
          ).reduce((acc, [path, content]) => {
            if (path === dictionaryId) {
              return acc;
            }

            return {
              ...acc,
              [path]: content,
            };
          }, {});

          return {
            editedContent: filteredEditedContent,
          };
        });
      },

      clearEditedContent: () => {
        set({ editedContent: {} });
      },

      getEditedContentValue: (dictionaryId, keyPath) =>
        getDictionaryValueByKeyPath(get().editedContent[dictionaryId], keyPath),
    }),
    {
      name: 'edited-content-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
