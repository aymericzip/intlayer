'use client';

import { isSameKeyPath } from '@intlayer/core/utils';
import { useCommunicator, useFocusDictionary } from '@intlayer/editor-react';
import { MessageKey } from '@intlayer/types/messageKey';
import { NodeType } from '@intlayer/types/nodeType';
import { type FC, useEffect, useRef } from 'react';
import type { ContentSelectorWrapperProps } from './ContentSelectorWrapper';

// JSX declaration for the Lit web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'intlayer-content-selector': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'is-selecting'?: boolean;
          'press-duration'?: number;
        },
        HTMLElement
      >;
    }
  }
}

const ContentSelectorWrapperContent: FC<ContentSelectorWrapperProps> = ({
  children,
  dictionaryKey,
  keyPath,
}) => {
  const { focusedContent, setFocusedContent } = useFocusDictionary();
  const { postMessage, senderId } = useCommunicator();
  const ref = useRef<HTMLElement>(null);

  const filteredKeyPath = keyPath.filter(
    (key) => key.type !== NodeType.Translation
  );

  const isSelected =
    (focusedContent?.dictionaryKey === dictionaryKey &&
      (focusedContent?.keyPath?.length ?? 0) > 0 &&
      isSameKeyPath(focusedContent?.keyPath ?? [], filteredKeyPath)) ??
    false;

  // React 18: web component custom events are not forwarded via JSX — use addEventListener
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handlePress = () => {
      setFocusedContent({ dictionaryKey, keyPath: filteredKeyPath });
    };

    const handleHover = () => {
      postMessage({
        type: `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
        data: { dictionaryKey, keyPath: filteredKeyPath },
        senderId,
      });
    };

    const handleUnhover = () => {
      postMessage({
        type: `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
        data: null,
        senderId,
      });
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
    // @ts-ignore — ref typing for custom elements
    <intlayer-content-selector ref={ref} is-selecting={isSelected || undefined}>
      {children}
    </intlayer-content-selector>
  );
};

export { ContentSelectorWrapperContent };
