'use client';

import type { KeyPath } from '@intlayer/core';
import { ContentSelector } from '@intlayer/design-system';
import type { FC } from 'react';
import { useEditedContentStore } from './EditionPanel/useEditedContentStore';
import { useEditionPanelStore } from './EditionPanel/useEditionPanelStore';

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
  const setFocusedContent = useEditionPanelStore((s) => s.setFocusedContent);
  const handleSelect = () =>
    setFocusedContent({
      dictionaryId,
      dictionaryPath,
      keyPath,
    });
  const getEditedContentValue = useEditedContentStore(
    (s) => s.getEditedContentValue
  );
  const editedValue = getEditedContentValue(dictionaryPath, keyPath);

  return (
    <ContentSelector onSelect={handleSelect}>
      {editedValue ?? children}
    </ContentSelector>
  );
};
