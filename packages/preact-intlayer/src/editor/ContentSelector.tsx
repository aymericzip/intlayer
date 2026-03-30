import type { NodeProps } from '@intlayer/core/interpreter';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { FunctionalComponent, HTMLAttributes } from 'preact';
import { useEffect } from 'preact/hooks';

// JSX declaration for the Lit web component in Preact
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'intlayer-content-selector-wrapper': HTMLAttributes<HTMLElement> & {
        'key-path'?: string;
        'dictionary-key'?: string;
      };
    }
  }
}

const TREE_SHAKE_EDITOR = process.env['INTLAYER_EDITOR_ENABLED'] === 'false';

export type ContentSelectorWrapperProps = NodeProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export const ContentSelector: FunctionalComponent<
  ContentSelectorWrapperProps
> = ({ children, dictionaryKey, keyPath }) => {
  useEffect(() => {
    if (TREE_SHAKE_EDITOR || !isEnabled || typeof window === 'undefined')
      return;
    import('@intlayer/editor').then(({ defineIntlayerElements }) => {
      defineIntlayerElements();
    });
  }, [isEnabled]);

  if (TREE_SHAKE_EDITOR || !isEnabled) {
    return children;
  }

  return (
    <intlayer-content-selector-wrapper
      key-path={JSON.stringify(keyPath)}
      dictionary-key={dictionaryKey}
    >
      {children}
    </intlayer-content-selector-wrapper>
  );
};
