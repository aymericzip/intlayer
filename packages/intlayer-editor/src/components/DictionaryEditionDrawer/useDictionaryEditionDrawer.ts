import type { Dictionary, DictionaryValue, KeyPath } from '@intlayer/core';
import { useRightDrawerStore } from '@intlayer/design-system';
import {
  useEditedContentActions,
  useFocusDictionary,
} from '@intlayer/editor-react';
import { useEffect } from 'react';

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
  close: () => void;
  getEditedContentValue: (
    dictionaryKey: DictionaryKey,
    keyPath: KeyPath[]
  ) => DictionaryValue | undefined;
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
  const { getEditedContentValue } = useEditedContentActions();
  const { focusedContent } = useFocusDictionary();

  useEffect(() => {
    if (focusedContent) {
      openDrawer(id);
    }
  }, [focusedContent, openDrawer, id]);

  return {
    isOpen: isOpenDrawer(id),
    focusedContent,
    getEditedContentValue,
    close: () => closeDrawer(id),
  };
};
