import configuration from '@intlayer/config/built';
import type { NodeProps } from '@intlayer/core/interpreter';
import { isSameKeyPath } from '@intlayer/core/utils';
import { MessageKey } from '@intlayer/types/messageKey';
import { NodeType } from '@intlayer/types/nodeType';
import type { FunctionalComponent, HTMLAttributes } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { useIntlayerContext } from '../client';
import { useEditorStateManager } from './EditorStateContext';
import { useFocusDictionary } from './FocusDictionaryContext';

export type ContentSelectorWrapperProps = NodeProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

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
      manager?.messenger.send(
        `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
        { dictionaryKey, keyPath: filteredKeyPath }
      );
    };

    const handleUnhover = () => {
      manager?.messenger.send(
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
  const { disableEditor } = useIntlayerContext();
  const { editor } = configuration ?? {};
  const isEnabled = editor?.enabled ?? false;

  const isEditorEnabled =
    typeof window !== 'undefined' &&
    isEnabled &&
    !disableEditor &&
    window.self !== window.top;

  useEffect(() => {
    if (!isEditorEnabled) return;

    import('@intlayer/editor').then(({ defineIntlayerElements }) => {
      defineIntlayerElements();
    });
  }, []);

  if (isEditorEnabled) {
    return (
      <ContentSelectorWrapperContent {...props}>
        {children}
      </ContentSelectorWrapperContent>
    );
  }

  return children;
};
