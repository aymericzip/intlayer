import type { KeyPath } from '@intlayer/core';
import { create } from 'zustand';

type DictionaryPath = string;
type FileContent = {
  dictionaryPath: DictionaryPath;
  dictionaryId: string;
  keyPath: KeyPath[];
};

type EditionPanelStore = {
  focusedContent: FileContent | null;
  setFocusedContent: (content: FileContent | null) => void;
};

export const useEditionPanelStore = create<EditionPanelStore>((set) => ({
  focusedContent: null,
  setFocusedContent: (content) => set({ focusedContent: content }),
}));
