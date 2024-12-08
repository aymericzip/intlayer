import type { Dictionary, DictionaryValue, KeyPath } from '@intlayer/core';
import {
  useRightDrawerStore,
  useEditedContentStore,
  useEditionPanelStore,
} from '@intlayer/design-system';
import { useCallback } from 'react';
import { useShallow } from 'zustand/shallow';

export const getDrawerIdentifier = (dictionaryId: string) =>
  `dictionary_edition_${dictionaryId}`;

type DictionaryId = string;
type DictionaryPath = string;

export type FileContent = {
  dictionaryPath?: DictionaryPath;
  dictionaryId: string;
  keyPath?: KeyPath[];
};

type DictionaryEditionDrawer = {
  focusedContent: FileContent | null;
  isOpen: boolean;
  open: (content: FileContent) => void;
  close: () => void;
  setDictionariesRecord: (
    dictionariesRecord: Record<DictionaryId, Dictionary>
  ) => void;
  getEditedContentValue: (
    dictionaryId: DictionaryId,
    keyPath: KeyPath[]
  ) => DictionaryValue | undefined;
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
  const { isOpenDrawer, openDrawer, closeDrawer } = useRightDrawerStore(
    useShallow((e) => ({
      isOpenDrawer: e.isOpen,
      openDrawer: e.open,
      closeDrawer: e.close,
    }))
  );
  const { setDictionariesRecord, getEditedContentValue } =
    useEditedContentStore(
      useShallow((s) => ({
        setDictionariesRecord: s.setDictionariesRecord,
        getEditedContentValue: s.getEditedContentValue,
      }))
    );
  const { setFocusedContent, focusedContent } = useEditionPanelStore(
    useShallow((s) => ({
      focusedContent: s.focusedContent,
      setFocusedContent: s.setFocusedContent,
    }))
  );

  const openDictionaryEditionDrawer = useCallback(
    ({
      dictionaryId,
      dictionaryPath,
      keyPath = [],
    }: OpenDictionaryEditionDrawerProps) => {
      setFocusedContent({
        dictionaryId,
        dictionaryPath,
        keyPath,
      });

      openDrawer(id);
    },
    [openDrawer, setFocusedContent]
  );

  return {
    isOpen: isOpenDrawer(id),
    focusedContent,
    setDictionariesRecord,
    getEditedContentValue,
    open: openDictionaryEditionDrawer,
    close: () => closeDrawer(id),
  };
};
