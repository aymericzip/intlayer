import type { Dictionary, DictionaryValue, KeyPath } from '@intlayer/core';
import {
  useRightDrawerStore,
  useEditedContentStore,
  useEditionPanelStore,
  type DictionaryContent,
} from '@intlayer/design-system';
import { useEditorServer } from '../useEditorServer';
/* eslint-disable import/no-cycle */
import { getDrawerIdentifier } from './DictionaryEditionDrawer';

type DictionaryId = string;
type DictionaryPath = string;

export type FileContent = {
  dictionaryPath?: DictionaryPath;
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
  editedContent: DictionaryContent;
  addEditedContent: (
    dictionaryId: DictionaryId,
    newValue: DictionaryValue,
    keyPath: KeyPath[]
  ) => void;
  setDictionariesRecord: (
    dictionariesRecord: Record<DictionaryId, Dictionary>
  ) => void;
  getEditedContentValue: (
    dictionaryId: DictionaryId,
    keyPath: KeyPath[]
  ) => DictionaryValue | undefined;
  clearEditedDictionaryContent: (dictionaryPath: DictionaryPath) => void;
};

type OpenDictionaryEditionDrawerProps = {
  dictionaryId: string;
  dictionaryPath?: string;
  keyPath?: KeyPath[];
};

export const useDictionaryEditionDrawer = (
  dictionaryId: string
): DictionaryEditionDrawer => {
  const id = getDrawerIdentifier(dictionaryId);
  const { isOpen, open, close } = useRightDrawerStore(id)();
  const {
    editedContent,
    setDictionariesRecord,
    getEditedContentValue,
    addEditedContent,
    clearEditedDictionaryContent,
  } = useEditedContentStore((s) => ({
    editedContent: s.editedContent,
    setDictionariesRecord: s.setDictionariesRecord,
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
    setDictionariesRecord,
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
