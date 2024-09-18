import { type KeyPath, isSameKeyPath } from '@intlayer/core';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { FileContent } from '.';

type DictionaryId = string;
type DictionaryPath = string | undefined;

export type EditedContent = Record<DictionaryId, FileContent[]>;

type EditedContentStore = {
  editedContent: EditedContent;
  addEditedContent: (
    dictionaryId: DictionaryId,
    dictionaryPath: DictionaryPath,
    keyPath: KeyPath[],
    newValue: string
  ) => void;
  removeEditedContent: (dictionaryId: DictionaryId, keyPath: KeyPath[]) => void;
  clearEditedDictionaryContent: (dictionaryId: DictionaryId) => void;
  clearEditedContent: () => void;
  getEditedContentValue: (
    dictionaryId: DictionaryId,
    keyPath: KeyPath[]
  ) => string | undefined;
};

export const useEditedContentStore = create(
  persist<EditedContentStore>(
    (set, get) => ({
      editedContent: {},
      addEditedContent: (dictionaryId, dictionaryPath, keyPath, newValue) => {
        set((state) => {
          const editedContent = state.editedContent[dictionaryId] ?? [];
          return {
            editedContent: {
              ...state.editedContent,
              [dictionaryId]: [
                ...editedContent.filter(
                  (content) => !isSameKeyPath(content.keyPath, keyPath)
                ),
                {
                  dictionaryPath,
                  keyPath,
                  newValue,
                },
              ],
            },
          };
        });
      },

      removeEditedContent: (dictionaryId, keyPath) => {
        set((state) => {
          const editedContent = state.editedContent[dictionaryId] ?? [];
          return {
            editedContent: {
              ...state.editedContent,
              [dictionaryId]: editedContent.filter(
                (content) => content.keyPath !== keyPath
              ),
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

      getEditedContentValue: (dictionaryId, keyPath): string | undefined =>
        get().editedContent[dictionaryId]?.find((content) =>
          isSameKeyPath(content.keyPath, keyPath)
        )?.newValue,
    }),
    {
      name: 'edited-content-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
