import type { Dictionary, DictionaryValue, KeyPath } from '@intlayer/core';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  editDictionaryByKeyPath,
  getDictionaryValueByKeyPath,
  removeDictionaryValueByKeyPath,
} from '../../utils/dictionary';

export type DictionaryContent = Record<Dictionary['key'], Dictionary>;

type EditedContentStore = {
  dictionariesRecord: DictionaryContent;
  editedContent: DictionaryContent;
  setDictionariesRecord: (
    dictionariesRecord: Record<Dictionary['key'], Dictionary>
  ) => void;
  addEditedContent: (
    dictionaryKey: Dictionary['key'],
    newValue: DictionaryValue,
    keyPath?: KeyPath[],
    overwrite?: boolean
  ) => void;
  renameEditedContent: (
    dictionaryKey: Dictionary['key'],
    newKey: KeyPath['key'],
    keyPath?: KeyPath[]
  ) => void;
  removeEditedContent: (
    dictionaryKey: Dictionary['key'],
    keyPath: KeyPath[]
  ) => void;
  restoreEditedContent: (dictionaryKey: Dictionary['key']) => void;
  clearEditedDictionaryContent: (dictionaryKey: Dictionary['key']) => void;
  clearEditedContent: () => void;
  getEditedContentValue: (
    dictionaryKey: Dictionary['key'],
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
        dictionaryKey,
        newValue,
        keyPath = [],
        overwrite = true
      ) =>
        set((state) => {
          const dictionaryContent =
            state.editedContent[dictionaryKey]?.content ??
            state.dictionariesRecord[dictionaryKey].content;

          let newKeyPath: KeyPath[] = keyPath;

          if (!overwrite) {
            // Check if the key already exists, and increment the key if it does

            let isKeyExist = false;
            let index = 0;
            const otherKeyPath: KeyPath[] = keyPath.slice(0, -1);
            const lastKeyPath: KeyPath = keyPath[keyPath.length - 1];
            let finalKey = lastKeyPath.key;

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
              [dictionaryKey]: {
                ...state.editedContent[dictionaryKey],
                content: editedContent,
              },
            },
          };
        }),
      renameEditedContent: (dictionaryKey, newKey, keyPath = []) => {
        set((state) => {
          const dictionaryContent =
            state.editedContent[dictionaryKey]?.content ??
            state.dictionariesRecord[dictionaryKey].content;

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
              [dictionaryKey]: {
                ...state.editedContent[dictionaryKey],
                content: editedContent,
              },
            },
          };
        });
      },
      removeEditedContent: (dictionaryKey, keyPath) => {
        set((state) => {
          const initialDictionaryContent =
            state.dictionariesRecord[dictionaryKey].content;
          const editedDictionaryContent =
            state.editedContent[dictionaryKey]?.content ??
            initialDictionaryContent;

          const initialContent = getDictionaryValueByKeyPath(
            initialDictionaryContent,
            keyPath
          );

          const restoredContent = editDictionaryByKeyPath(
            editedDictionaryContent,
            keyPath,
            initialContent
          );

          return {
            editedContent: {
              ...state.editedContent,
              [dictionaryKey]: {
                ...state.editedContent[dictionaryKey],
                content: restoredContent,
              },
            },
          };
        });
      },

      restoreEditedContent: (dictionaryKey) => {
        set((state) => {
          const dictionaryContent =
            state.dictionariesRecord[dictionaryKey].content;

          return {
            editedContent: {
              ...state.editedContent,
              [dictionaryKey]: {
                ...state.editedContent[dictionaryKey],
                content: dictionaryContent,
              },
            },
          };
        });
      },

      clearEditedDictionaryContent: (dictionaryKey) => {
        set((state) => {
          const filteredEditedContent = Object.entries(
            state.editedContent
          ).reduce((acc, [path, content]) => {
            if (path === dictionaryKey) {
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

      getEditedContentValue: (dictionaryKey, keyPath) =>
        getDictionaryValueByKeyPath(
          get().editedContent[dictionaryKey],
          keyPath
        ),
    }),
    {
      name: 'edited-content-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
