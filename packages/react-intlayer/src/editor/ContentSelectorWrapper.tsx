'use client';

import { isSameKeyPath, type KeyPath } from '@intlayer/core';
import {
  useFocusDictionary,
  useEditedContentActions,
  useEditorEnabled,
} from '@intlayer/editor-react';
import {
  useCallback,
  useEffect,
  useState,
  useMemo,
  type FC,
  type ReactNode,
  HTMLAttributes,
} from 'react';
import { ContentSelector } from '../UI/ContentSelector';

type ContentData = {
  dictionaryKey: string;
  dictionaryPath: string;
  keyPath: KeyPath[];
};

export type ContentSelectorWrapperProps = ContentData &
  HTMLAttributes<HTMLDivElement>;

export const ContentSelectorWrapper: FC<ContentSelectorWrapperProps> = ({
  children,
  dictionaryKey,
  dictionaryPath,
  keyPath,
  ...props
}) => {
  const { enabled } = useEditorEnabled();
  const { focusedContent, setFocusedContent } = useFocusDictionary();
  const { getEditedContentValue } = useEditedContentActions();

  const editedValue = useMemo(
    () => getEditedContentValue(dictionaryKey, keyPath),
    [dictionaryKey, keyPath, getEditedContentValue]
  );

  const [displayedChildren, setDisplayedChildren] =
    useState<ReactNode>(children);

  const handleSelect = useCallback(
    () =>
      setFocusedContent({
        dictionaryKey,
        dictionaryPath,
        keyPath,
      }),
    [dictionaryKey, dictionaryPath, keyPath, setFocusedContent]
  );

  const isSelected = useMemo(
    () =>
      (focusedContent?.dictionaryKey === dictionaryKey &&
        (focusedContent?.keyPath?.length ?? 0) > 0 &&
        isSameKeyPath(focusedContent?.keyPath ?? [], keyPath)) ??
      false,
    [focusedContent, keyPath]
  );

  useEffect(() => {
    // Use useEffect to avoid 'Text content does not match server-rendered HTML' error
    if (editedValue && typeof editedValue === 'string') {
      setDisplayedChildren(editedValue);
    } else {
      setDisplayedChildren(children);
    }
  }, [editedValue, focusedContent, children]);

  if (enabled) {
    return (
      <ContentSelector
        onPress={handleSelect}
        isSelecting={isSelected}
        {...props}
      >
        {displayedChildren}
      </ContentSelector>
    );
  }

  return <>{children}</>;
};
