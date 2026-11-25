import type { NodeProps } from '@intlayer/core/interpreter';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Component } from 'solid-js';
import type { IntrinsicElementProps, SolidElement } from '../solidTypes';

export type ContentSelectorWrapperProps = NodeProps &
  Omit<IntrinsicElementProps<'div'>, 'children'> & {
    children?: SolidElement;
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
