import type { KeyPath } from '@intlayer/core';
import type { FileContent } from '@intlayer/design-system';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type DictionaryPath = string;

export type EditedContent = Record<DictionaryPath, FileContent[]>;

type EditedContentStore = {
  editedContent: EditedContent;
  addEditedContent: (
    dictionaryPath: DictionaryPath,
    keyPath: KeyPath[],
    newValue: string
  ) => void;
  removeEditedContent: (
    dictionaryPath: DictionaryPath,
    keyPath: KeyPath[]
  ) => void;
  clearEditedDictionaryContent: (dictionaryPath: DictionaryPath) => void;
};

const isSameKeyPath = (keyPath1: KeyPath[], keyPath2: KeyPath[]) =>
  keyPath1.every(
    (element, index) =>
      keyPath2[index] &&
      keyPath2[index].key === element.key &&
      keyPath2[index].type === element.type
  );

export const useEditedContentStore = create(
  persist<EditedContentStore>(
    (set) => ({
      editedContent: {},
      addEditedContent: (dictionaryPath, keyPath, newValue) => {
        set((state) => {
          const editedContent = state.editedContent[dictionaryPath] ?? [];
          return {
            editedContent: {
              ...state.editedContent,
              [dictionaryPath]: [
                ...editedContent.filter(
                  (content) => !isSameKeyPath(content.keyPath, keyPath)
                ),
                {
                  keyPath,
                  newValue,
                },
              ],
            },
          };
        });
      },

      removeEditedContent: (dictionaryPath, keyPath) => {
        set((state) => {
          const editedContent = state.editedContent[dictionaryPath] ?? [];
          return {
            editedContent: {
              ...state.editedContent,
              [dictionaryPath]: editedContent.filter(
                (content) => content.keyPath !== keyPath
              ),
            },
          };
        });
      },

      clearEditedDictionaryContent: (dictionaryPath) => {
        set((state) => ({
          editedContent: {
            ...state.editedContent,
            [dictionaryPath]: [],
          },
        }));
      },
    }),
    {
      name: 'edited-content-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
