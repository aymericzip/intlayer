import type { NodeProps } from '@intlayer/core/interpreter';
import { isSameKeyPath } from '@intlayer/core/utils';
import { defineIntlayerElements, MessageKey } from '@intlayer/editor';
import { NodeType } from '@intlayer/types/nodeType';
import type { FunctionalComponent, JSX } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { useIntlayerContext } from '../client';
import { useEditorEnabled } from './EditorEnabledContext';
import { useEditorStateManager } from './EditorStateContext';
import { useFocusDictionary } from './FocusDictionaryContext';

export type ContentSelectorWrapperProps = NodeProps &
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'>;

const ContentSelectorWrapperContent: FunctionalComponent<
  ContentSelectorWrapperProps
> = ({ children, dictionaryKey, keyPath }) => {
  const { focusedContent, setFocusedContent } = useFocusDictionary();
  const manager = useEditorStateManager();
  const ref = useRef<HTMLElement>(null);

  const filteredKeyPath = keyPath.filter(
    (key) => key.type !== NodeType.Translation
  );

  const isSelected =
    (focusedContent?.dictionaryKey === dictionaryKey &&
      (focusedContent?.keyPath?.length ?? 0) > 0 &&
      isSameKeyPath(focusedContent?.keyPath ?? [], filteredKeyPath)) ??
    false;

  // Preact (like React 18) requires addEventListener for web component custom events
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handlePress = () => {
      setFocusedContent({ dictionaryKey, keyPath: filteredKeyPath });
    };

    const handleHover = () => {
      manager.messenger.send(
        `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
        { dictionaryKey, keyPath: filteredKeyPath }
      );
    };

    const handleUnhover = () => {
      manager.messenger.send(
        `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
        null
      );
    };

    el.addEventListener('intlayer:press', handlePress);
    el.addEventListener('intlayer:hover', handleHover);
    el.addEventListener('intlayer:unhover', handleUnhover);
    return () => {
      el.removeEventListener('intlayer:press', handlePress);
      el.removeEventListener('intlayer:hover', handleHover);
      el.removeEventListener('intlayer:unhover', handleUnhover);
    };
  });

  return (
    // @ts-ignore — custom element typing
    <intlayer-content-selector ref={ref} is-selecting={isSelected || undefined}>
      {children}
    </intlayer-content-selector>
  );
};

export const ContentSelectorRenderer: FunctionalComponent<
  ContentSelectorWrapperProps
> = ({ children, ...props }) => {
  const { enabled } = useEditorEnabled();
  const { disableEditor } = useIntlayerContext();

  useEffect(() => {
    defineIntlayerElements();
  }, []);

  if (enabled && !disableEditor) {
    return (
      <ContentSelectorWrapperContent {...props}>
        {children}
      </ContentSelectorWrapperContent>
    );
  }

  return children;
};
