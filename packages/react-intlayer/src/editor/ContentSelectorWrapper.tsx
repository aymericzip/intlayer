'use client';

import { type NodeProps, isSameKeyPath } from '@intlayer/core';
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

export type ContentSelectorWrapperProps = NodeProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'content'>;

const ContentSelectorWrapperContent: FC<ContentSelectorWrapperProps> = ({
  children,
  dictionaryKey,
  keyPath,
  ...props
}) => {
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
        keyPath,
      }),
    [dictionaryKey, keyPath, setFocusedContent]
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

  return (
    <ContentSelector onPress={handleSelect} isSelecting={isSelected} {...props}>
      {displayedChildren}
    </ContentSelector>
  );
};

export const ContentSelectorWrapper: FC<ContentSelectorWrapperProps> = ({
  children,
  ...props
}) => {
  const { enabled } = useEditorEnabled();

  if (enabled) {
    return (
      <ContentSelectorWrapperContent {...props}>
        {children}
      </ContentSelectorWrapperContent>
    );
  }

  return <>{children}</>;
};
