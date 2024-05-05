'use client';

import type { KeyPath } from '@intlayer/core';
import { ContentSelector } from '@intlayer/design-system';
import type { FC } from 'react';
import { useDictionaryEditionDrawer } from './DictionaryEditionDrawer/useDictionaryEditionDrawer';

type ContentSelectorWrapperProps = {
  children: string;
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
  const { open, getEditedContentValue } =
    useDictionaryEditionDrawer(dictionaryId);
  const editedValue = getEditedContentValue(dictionaryPath, keyPath);

  const handleSelect = () =>
    open({
      dictionaryId,
      dictionaryPath,
      keyPath,
    });

  return (
    <ContentSelector onSelect={handleSelect}>
      {editedValue ?? children}
    </ContentSelector>
  );
};
