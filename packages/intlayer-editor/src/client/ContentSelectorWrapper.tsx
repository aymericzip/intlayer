'use client';

import { isSameKeyPath, type KeyPath } from '@intlayer/core';
import { ContentSelector } from '@intlayer/design-system';
import { useCallback, type FC, type ReactNode } from 'react';
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
  const editedValue = getEditedContentValue(dictionaryPath, keyPath);

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

  return (
    <ContentSelector onSelect={handleSelect} isSelecting={isSelected}>
      {editedValue ?? children}
    </ContentSelector>
  );
};
