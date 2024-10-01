'use client';

import { isSameKeyPath, type KeyPath } from '@intlayer/core';
import { ContentSelector } from '@intlayer/design-system';
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import { IntlayerEditorContext } from './ContentEditorProvider';
import { useDictionaryEditionDrawer } from './DictionaryEditionDrawer/useDictionaryEditionDrawer';

type ContentSelectorWrapperProps = {
  children: ReactNode;
  dictionaryId: string;
  dictionaryPath: string;
  keyPath: KeyPath[];
};

export const ContentSelectorWrapper: FC<ContentSelectorWrapperProps> = ({
  children,
  dictionaryId,
  dictionaryPath,
  keyPath,
}) => {
  const { open, getEditedContentValue, focusedContent, isOpen } =
    useDictionaryEditionDrawer(dictionaryId);
  const editedValue = getEditedContentValue(dictionaryId, keyPath);
  const { editorEnabled } = useContext(IntlayerEditorContext);
  const [displayedChildren, setDisplayedChildren] =
    useState<ReactNode>(children);

  const handleSelect = useCallback(
    () =>
      open({
        dictionaryId,
        dictionaryPath,
        keyPath,
      }),
    [dictionaryId, dictionaryPath, keyPath, open]
  );

  const isSelected =
    (isOpen &&
      (focusedContent?.keyPath?.length ?? 0) > 0 &&
      isSameKeyPath(focusedContent?.keyPath ?? [], keyPath)) ??
    false;

  useEffect(() => {
    // Use useEffect to avoid 'Text content does not match server-rendered HTML' error
    if (editorEnabled && editedValue && typeof editedValue === 'string') {
      setDisplayedChildren(editedValue);
    }
  }, [editedValue, editorEnabled]);

  if (!editorEnabled) {
    return children;
  }

  return (
    <ContentSelector onSelect={handleSelect} isSelecting={isSelected}>
      {displayedChildren}
    </ContentSelector>
  );
};
