'use client';

import type { KeyPath } from '@intlayer/core';
import { ContentSelector } from '@intlayer/design-system';
import type { FC } from 'react';
import { useEditedContentStore } from './EditionPanel/useEditedContentStore';
import { useEditionPanel } from './EditionPanel/useEditionPanel';

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
  const { open, getEditedContentValue } = useEditionPanel();
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
