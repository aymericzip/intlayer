import type { KeyPath } from '@intlayer/core';
import {
  useRightDrawerStore,
  type EditedContent,
  useEditedContentStore,
} from '@intlayer/design-system';
import { useEditorServer } from '../useEditorServer';
import { getDrawerIdentifier } from './DictionaryEditionDrawer';
import { useEditionPanelStore } from './useFocusContentStore';

type DictionaryId = string;
type DictionaryPath = string;

export type FileContent = {
  dictionaryPath: DictionaryPath | undefined;
  dictionaryId: string;
  keyPath?: KeyPath[];
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
    dictionaryId: DictionaryId,
    dictionaryPath: DictionaryPath | undefined,
    keyPath: KeyPath[],
    newValue: string
  ) => void;
  getEditedContentValue: (
    dictionaryPath: DictionaryPath,
    keyPath: KeyPath[]
  ) => string | undefined;
  clearEditedDictionaryContent: (dictionaryPath: DictionaryPath) => void;
};

type OpenDictionaryEditionDrawerProps = {
  dictionaryId: string;
  dictionaryPath: string | undefined;
  keyPath?: KeyPath[];
};

export const useDictionaryEditionDrawer = (
  dictionaryId: string
): DictionaryEditionDrawer => {
  const id = getDrawerIdentifier(dictionaryId);
  const { isOpen, open, close } = useRightDrawerStore(id)();
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

  const openDictionaryEditionDrawer = ({
    dictionaryId,
    dictionaryPath,
    keyPath = [],
  }: OpenDictionaryEditionDrawerProps) => {
    setFocusedContent({
      dictionaryId,
      dictionaryPath,
      keyPath,
    });

    open();
  };

  return {
    isOpen,
    focusedContent,
    setFocusedContent,
    open: openDictionaryEditionDrawer,
    close,
    getEditedContentValue,
    editContentRequest,
    editedContent,
    addEditedContent,
    clearEditedDictionaryContent,
  };
};

type DictionaryEditionDrawerControl = {
  open: (content: FileContent) => void;
  close: (dictionaryId: string) => void;
};

export const useDictionaryEditionDrawerControl =
  (): DictionaryEditionDrawerControl => {
    const setFocusedContent = useEditionPanelStore((s) => s.setFocusedContent);

    const open = ({
      dictionaryId,
      dictionaryPath,
      keyPath = [],
    }: OpenDictionaryEditionDrawerProps) => {
      setFocusedContent({
        dictionaryId,
        dictionaryPath,
        keyPath,
      });

      const id = getDrawerIdentifier(dictionaryId);

      useRightDrawerStore(id).getState().open();
    };

    const close = (dictionaryId: string) => {
      const id = getDrawerIdentifier(dictionaryId);

      useRightDrawerStore(id).getState().close();
    };

    return {
      open,
      close,
    };
  };
