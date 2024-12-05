'use client';

import { isSameKeyPath, type KeyPath } from '@intlayer/core';
import { ContentSelector } from '@intlayer/design-system';
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
  const { isEditorEnabled } = useIntlayerEditorContext();
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
    }
  }, [editedValue, isEditorEnabled]);

  if (!isEditorEnabled) {
    return children;
  }

  return (
    <ContentSelector onSelect={handleSelect} isSelecting={isSelected}>
      {displayedChildren}
    </ContentSelector>
  );
};
