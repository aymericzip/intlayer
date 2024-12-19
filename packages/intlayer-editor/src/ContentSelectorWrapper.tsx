'use client';

import { isSameKeyPath, type KeyPath } from '@intlayer/core';
import {
  ContentSelector,
  useEditedContentStore,
} from '@intlayer/design-system';
import {
  useCallback,
  useEffect,
  useState,
  useMemo,
  type FC,
  type ReactNode,
} from 'react';
import { useIntlayerEditorContext } from './IntlayerEditorProvider';
import { useDictionaryEditionDrawer } from './DictionaryEditionDrawer/useDictionaryEditionDrawer';
import { useShallow } from 'zustand/shallow';

type ContentSelectorWrapperProps = {
  children: ReactNode;
  dictionaryKey: string;
  dictionaryPath: string;
  keyPath: KeyPath[];
};

export const ContentSelectorWrapper: FC<ContentSelectorWrapperProps> = ({
  children,
  dictionaryKey,
  dictionaryPath,
  keyPath,
}) => {
  const { open, getEditedContentValue, focusedContent, isOpen } =
    useDictionaryEditionDrawer(dictionaryKey);
  const { editedContent } = useEditedContentStore(
    useShallow((s) => ({
      editedContent: s.editedContent,
    }))
  );
  const editedValue = useMemo(
    () => getEditedContentValue(dictionaryKey, keyPath),
    [
      editedContent[dictionaryKey],
      dictionaryKey,
      keyPath,
      getEditedContentValue,
    ]
  );
  const { isEditorEnabled } = useIntlayerEditorContext();
  const [displayedChildren, setDisplayedChildren] =
    useState<ReactNode>(children);

  const handleSelect = useCallback(
    () =>
      open({
        dictionaryKey,
        dictionaryPath,
        keyPath,
      }),
    [dictionaryKey, dictionaryPath, keyPath, open]
  );

  const isSelected = useMemo(
    () =>
      (isOpen &&
        (focusedContent?.keyPath?.length ?? 0) > 0 &&
        isSameKeyPath(focusedContent?.keyPath ?? [], keyPath)) ??
      false,
    [focusedContent, isOpen, keyPath]
  );

  useEffect(() => {
    // Use useEffect to avoid 'Text content does not match server-rendered HTML' error
    if (isEditorEnabled && editedValue && typeof editedValue === 'string') {
      setDisplayedChildren(editedValue);
    } else {
      setDisplayedChildren(children);
    }
  }, [editedValue, isEditorEnabled, focusedContent, children]);

  if (!isEditorEnabled) {
    return children;
  }

  return (
    <ContentSelector onSelect={handleSelect} isSelecting={isSelected}>
      {displayedChildren}
    </ContentSelector>
  );
};
