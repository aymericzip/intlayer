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

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

/**
 * True when the editor is explicitly disabled at build time.
 */
const TREE_SHAKE_EDITOR = process.env['INTLAYER_EDITOR_ENABLED'] === 'false';

export const ContentSelector: Component<ContentSelectorWrapperProps> = (
  props
) => {
  if (TREE_SHAKE_EDITOR || !isEnabled) {
    return props.children;
  }

  return (
    <Dynamic
      component="intlayer-content-selector-wrapper"
      attr:key-path={JSON.stringify(props.keyPath)}
      attr:dictionary-key={props.dictionaryKey}
    >
      {props.children}
    </Dynamic>
  );
};
