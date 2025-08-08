'use client';

import { type NodeProps, isSameKeyPath } from '@intlayer/core';
import { MessageKey } from '@intlayer/editor';
import {
  type FC,
  type HTMLAttributes,
  useCallback,
  useMemo,
} from 'preact/compat';
import { useIntlayerContext } from '../client';
import { ContentSelector } from '../UI/ContentSelector';
import { useCommunicator } from './CommunicatorContext';
import { useEditorEnabled } from './EditorEnabledContext';
import { useFocusDictionary } from './FocusDictionaryContext';

export type ContentSelectorWrapperProps = NodeProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

const ContentSelectorWrapperContent: FC<ContentSelectorWrapperProps> = ({
  children,
  dictionaryKey,
  keyPath,
}) => {
  const { focusedContent, setFocusedContent } = useFocusDictionary();
  const { postMessage, senderId } = useCommunicator();

  const handleSelect = useCallback(
    () =>
      setFocusedContent({
        dictionaryKey,
        keyPath,
      }),
    [dictionaryKey, keyPath]
  );

  const handleHover = useCallback(
    () =>
      postMessage({
        type: `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
        data: {
          dictionaryKey,
          keyPath,
        },
        senderId,
      }),
    [dictionaryKey, keyPath]
  );

  const handleUnhover = useCallback(
    () =>
      postMessage({
        type: `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
        data: null,
        senderId,
      }),
    [senderId]
  );

  const isSelected = useMemo(
    () =>
      (focusedContent?.dictionaryKey === dictionaryKey &&
        (focusedContent?.keyPath?.length ?? 0) > 0 &&
        isSameKeyPath(focusedContent?.keyPath ?? [], keyPath)) ??
      false,
    [focusedContent, keyPath, dictionaryKey]
  );

  return (
    <ContentSelector
      onPress={handleSelect}
      onHover={handleHover}
      onUnhover={handleUnhover}
      isSelecting={isSelected}
    >
      {children}
    </ContentSelector>
  );
};

export const ContentSelectorRenderer: FC<ContentSelectorWrapperProps> = ({
  children,
  ...props
}) => {
  const { enabled } = useEditorEnabled();
  const { disableEditor } = useIntlayerContext();

  if (enabled && !disableEditor) {
    return (
      <ContentSelectorWrapperContent {...props}>
        {children}
      </ContentSelectorWrapperContent>
    );
  }

  return children;
};
