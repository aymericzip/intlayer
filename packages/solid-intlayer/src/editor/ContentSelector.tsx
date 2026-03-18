import type { NodeProps } from '@intlayer/core/interpreter';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Component, JSX } from 'solid-js';

// JSX declaration for the Lit web components
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'intlayer-content-selector-wrapper': JSX.HTMLAttributes<HTMLElement> & {
        'key-path'?: string;
        'dictionary-key'?: string;
      };
    }
  }
}

export type ContentSelectorWrapperProps = NodeProps &
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: JSX.Element;
  };

export const ContentSelector: Component<ContentSelectorWrapperProps> = ({
  keyPath,
  dictionaryKey,
  children,
}) => {
  if (isEnabled) {
    return (
      <intlayer-content-selector-wrapper
        attr:key-path={JSON.stringify(keyPath)}
        attr:dictionary-key={dictionaryKey}
      >
        {children}
      </intlayer-content-selector-wrapper>
    );
  }

  return children;
};
