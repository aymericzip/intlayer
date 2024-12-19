import type { Dictionary, DictionaryValue, KeyPath } from '@intlayer/core';
import {
  useRightDrawerStore,
  useEditedContentStore,
  useEditionPanelStore,
} from '@intlayer/design-system';
import { useCallback } from 'react';
import { useShallow } from 'zustand/shallow';

export const getDrawerIdentifier = (dictionaryKey: string) =>
  `dictionary_edition_${dictionaryKey}`;

type DictionaryKey = string;
type DictionaryPath = string;

export type FileContent = {
  dictionaryPath?: DictionaryPath;
  dictionaryKey: DictionaryKey;
  keyPath?: KeyPath[];
};

type DictionaryEditionDrawer = {
  focusedContent: FileContent | null;
  isOpen: boolean;
  open: (content: FileContent) => void;
  close: () => void;
  setDictionariesRecord: (
    dictionariesRecord: Record<DictionaryKey, Dictionary>
  ) => void;
  getEditedContentValue: (
    dictionaryKey: DictionaryKey,
    keyPath: KeyPath[]
  ) => DictionaryValue | undefined;
};

type OpenDictionaryEditionDrawerProps = {
  dictionaryKey: string;
  dictionaryPath?: string;
  keyPath?: KeyPath[];
};

export const useDictionaryEditionDrawer = (
  dictionaryKey: string
): DictionaryEditionDrawer => {
  const id = getDrawerIdentifier(dictionaryKey);
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
      dictionaryKey,
      dictionaryPath,
      keyPath = [],
    }: OpenDictionaryEditionDrawerProps) => {
      setFocusedContent({
        dictionaryKey,
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
