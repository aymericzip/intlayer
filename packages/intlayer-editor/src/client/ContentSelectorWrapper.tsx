'use client';

import { isSameKeyPath, type KeyPath } from '@intlayer/core';
import { ContentSelector } from '@intlayer/design-system';
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import dictionaries from '@intlayer/dictionaries-entry';
import { useCallback, useContext, type FC, type ReactNode } from 'react';
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

  if (!editorEnabled) {
    return children;
  }

  if (typeof editedValue === 'object') {
    return (
      <ContentSelector onSelect={handleSelect} isSelecting={isSelected}>
        [Object Intlayer]
      </ContentSelector>
    );
  }

  return (
    <ContentSelector onSelect={handleSelect} isSelecting={isSelected}>
      {editedValue ?? children}
    </ContentSelector>
  );
};
