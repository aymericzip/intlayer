import {
  useIsRightDrawerOpen,
  useRightDrawerActions,
} from '@intlayer/design-system/right-drawer';
import {
  type FileContent,
  useEditedContentActions,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type {
  ContentNode,
  Dictionary,
  LocalDictionaryId,
} from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import { useCallback, useEffect } from 'preact/hooks';

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
  const { open: openDrawer, close: closeDrawer } = useRightDrawerActions();
  const isOpen = useIsRightDrawerOpen(id);
  const { getEditedContentValue } = useEditedContentActions();
  const { focusedContent, setFocusedContent } = useFocusUnmergedDictionary();

  useEffect(() => {
    if (focusedContent?.dictionaryKey) {
      openDrawer(id);
    }
  }, [focusedContent?.dictionaryKey, openDrawer, id]);

  const close = useCallback(() => {
    closeDrawer(id);

    setFocusedContent((previousContent) =>
      previousContent?.dictionaryKey
        ? { ...previousContent, keyPath: [] }
        : (previousContent ?? null)
    );
  }, [closeDrawer, id, setFocusedContent]);

  return { isOpen, focusedContent, getEditedContentValue, close };
};
