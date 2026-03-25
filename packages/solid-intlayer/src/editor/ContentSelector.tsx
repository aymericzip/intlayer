import type { NodeProps } from '@intlayer/core/interpreter';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

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

export const ContentSelector: Component<ContentSelectorWrapperProps> = (
  props
) => {
  if (isEnabled) {
    return (
      <Dynamic
        component="intlayer-content-selector-wrapper"
        attr:key-path={JSON.stringify(props.keyPath)}
        attr:dictionary-key={props.dictionaryKey}
      >
        {props.children}
      </Dynamic>
    );
  }

  return props.children;
};
