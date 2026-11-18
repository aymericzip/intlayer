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

export const ContentSelector: Component<ContentSelectorWrapperProps> = (
  props
) => {
  if (process.env.INTLAYER_EDITOR_ENABLED === 'false' || !isEnabled) {
    return props.children;
  }

  return (
    // oxlint-disable-next-line react/jsx-no-undef -- compiler built-in, auto-imported per Solid version
    <Dynamic
      component="intlayer-content-selector-wrapper"
      attr:key-path={JSON.stringify(props.keyPath)}
      attr:dictionary-key={props.dictionaryKey}
    >
      {props.children}
    </Dynamic>
  );
};
