import type { KeyPath } from '@intlayer/core';
import { useRightDrawerStore } from '@intlayer/design-system';
import { useEditorServer } from '../useEditorServer';
import {
  type EditedContent,
  useEditedContentStore,
} from './useEditedContentStore';
import { useEditionPanelStore } from './useFocusContentStore';

type DictionaryPath = string;
export type FileContent = {
  dictionaryPath: DictionaryPath;
  dictionaryId: string;
  keyPath: KeyPath[];
};

type DictionaryEditionDrawer = {
  focusedContent: FileContent | null;
  setFocusedContent: (content: FileContent | null) => void;
  isOpen: boolean;
  open: (content: FileContent) => void;
  close: () => void;
  editContentRequest: () => Promise<void>;
  editedContent: EditedContent;
  addEditedContent: (
    dictionaryPath: DictionaryPath,
    keyPath: KeyPath[],
    newValue: string
  ) => void;
  getEditedContentValue: (
    dictionaryPath: DictionaryPath,
    keyPath: KeyPath[]
  ) => string | undefined;
  clearEditedDictionaryContent: (dictionaryPath: DictionaryPath) => void;
};

export const useDictionaryEditionDrawer = (): DictionaryEditionDrawer => {
  const { isOpen, openPanel, closePanel } = useRightDrawerStore((s) => ({
    isOpen: s.isOpen,
    openPanel: s.open,
    closePanel: s.close,
  }));
  const {
    editedContent,
    getEditedContentValue,
    addEditedContent,
    clearEditedDictionaryContent,
  } = useEditedContentStore((s) => ({
    editedContent: s.editedContent,
    addEditedContent: s.addEditedContent,
    getEditedContentValue: s.getEditedContentValue,
    clearEditedDictionaryContent: s.clearEditedDictionaryContent,
  }));
  const { setFocusedContent, focusedContent } = useEditionPanelStore((s) => ({
    focusedContent: s.focusedContent,
    setFocusedContent: s.setFocusedContent,
  }));
  const { editContentRequest } = useEditorServer();

  return {
    isOpen,
    focusedContent,
    setFocusedContent,
    open: (content) => {
      setFocusedContent(content);
      openPanel();
    },
    close: () => {
      closePanel();
      setFocusedContent(null);
    },
    getEditedContentValue,
    editContentRequest,
    editedContent,
    addEditedContent,
    clearEditedDictionaryContent,
  };
};
