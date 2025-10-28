'use client';

import { isSameKeyPath, type NodeProps } from '@intlayer/core';
import { MessageKey } from '@intlayer/editor';
import { NodeType } from '@intlayer/types';
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

  // Filter out translation nodes for more flexibility with the editor that can have different format
  const filteredKeyPath = useMemo(
    () => keyPath.filter((key) => key.type !== NodeType.Translation),
    [keyPath]
  );

  const handleSelect = useCallback(
    () =>
      setFocusedContent({
        dictionaryKey,
        keyPath: filteredKeyPath,
      }),
    [dictionaryKey, filteredKeyPath]
  );

  const handleHover = useCallback(
    () =>
      postMessage({
        type: `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
        data: {
          dictionaryKey,
          keyPath: filteredKeyPath,
        },
        senderId,
      }),
    [dictionaryKey, filteredKeyPath]
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
        isSameKeyPath(focusedContent?.keyPath ?? [], filteredKeyPath)) ??
      false,
    [focusedContent, filteredKeyPath, dictionaryKey]
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
