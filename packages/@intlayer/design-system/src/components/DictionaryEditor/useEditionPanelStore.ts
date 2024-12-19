import type { KeyPath } from '@intlayer/core';
import { create } from 'zustand';

type DictionaryPath = string;
type FileContent = {
  dictionaryKey: string;
  keyPath?: KeyPath[];
  dictionaryPath?: DictionaryPath;
};

type EditionPanelStore = {
  focusedContent: FileContent | null;
  setFocusedContent: (content: FileContent | null) => void;
  setFocusedContentKeyPath: (keyPath: KeyPath[]) => void;
};

export const useEditionPanelStore = create<EditionPanelStore>((set) => ({
  focusedContent: null,
  setFocusedContent: (content) => set({ focusedContent: content }),
  setFocusedContentKeyPath: (keyPath) =>
    set((state) => ({
      focusedContent: {
        ...state.focusedContent!,
        keyPath,
      },
    })),
}));
