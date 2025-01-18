import type { Dictionary, DictionaryValue, KeyPath } from '@intlayer/core';
import { useRightDrawerStore } from '@intlayer/design-system';
import {
  useDictionariesRecord,
  useEditedContentActions,
  useFocusDictionary,
} from '@intlayer/editor-react';
import { useCallback } from 'react';

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
  const {
    isOpen: isOpenDrawer,
    open: openDrawer,
    close: closeDrawer,
  } = useRightDrawerStore();
  const { setDictionariesRecord } = useDictionariesRecord();
  const { getEditedContentValue } = useEditedContentActions();
  const { setFocusedContent, focusedContent } = useFocusDictionary();

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
