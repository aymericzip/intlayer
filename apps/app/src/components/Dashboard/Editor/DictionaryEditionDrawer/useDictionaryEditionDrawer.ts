import { useRightDrawerStore } from '@intlayer/design-system';
import {
  type FileContent,
  useEditedContentActions,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type {
  ContentNode,
  Dictionary,
  KeyPath,
  LocalDictionaryId,
} from '@intlayer/types';
import { useEffect } from 'react';

export const getDrawerIdentifier = (dictionaryKey: string) =>
  `dictionary_edition_${dictionaryKey}`;

type DictionaryEditionDrawer = {
  focusedContent: FileContent | null;
  isOpen: boolean;
  close: () => void;
  getEditedContentValue: (
    localDictionaryIdOrKey: LocalDictionaryId | Dictionary['key'] | string,
    keyPath: KeyPath[]
  ) => ContentNode | undefined;
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
  const { focusedContent, setFocusedContent } = useFocusUnmergedDictionary();

  useEffect(() => {
    if (focusedContent && (focusedContent.keyPath?.length ?? 0) > 0) {
      openDrawer(id);
    }
  }, [focusedContent, openDrawer, id]);

  return {
    isOpen: isOpenDrawer(id),
    focusedContent,
    getEditedContentValue,
    close: () => {
      closeDrawer(id);

      setFocusedContent((prev) => {
        if (prev?.dictionaryKey) {
          return {
            ...(prev as FileContent),
            keyPath: [],
          };
        }
        return prev;
      });
    },
  };
};
