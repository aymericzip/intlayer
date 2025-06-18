'use client';

import { isSameKeyPath, type NodeProps } from '@intlayer/core';
import { createMemo, type Component, type JSX } from 'solid-js';
import { useIntlayerContext } from '../client';
import { ContentSelector } from '../UI/ContentSelector';
import { useEditorEnabled, useFocusDictionary } from './contexts';

export type ContentSelectorWrapperProps = NodeProps &
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: JSX.Element;
  };

const ContentSelectorWrapperContent: Component<ContentSelectorWrapperProps> = (
  props
) => {
  const { focusedContent, setFocusedContent } = useFocusDictionary();

  const handleSelect = () =>
    setFocusedContent({
      dictionaryKey: props.dictionaryKey,
      keyPath: props.keyPath,
    });

  const isSelected = createMemo(
    () =>
      (focusedContent?.dictionaryKey === props.dictionaryKey &&
        (focusedContent?.keyPath?.length ?? 0) > 0 &&
        isSameKeyPath(focusedContent?.keyPath ?? [], props.keyPath)) ??
      false
  );

  return (
    <ContentSelector onPress={handleSelect} isSelecting={isSelected()}>
      {props.children}
    </ContentSelector>
  );
};

export const ContentSelectorRenderer: Component<ContentSelectorWrapperProps> = (
  props
) => {
  const { enabled } = useEditorEnabled();
  const { disableEditor } = useIntlayerContext();

  if (enabled() && !disableEditor) {
    return (
      <ContentSelectorWrapperContent {...props}>
        {props.children}
      </ContentSelectorWrapperContent>
    );
  }

  return props.children;
};
