'use client';

import configuration from '@intlayer/config/built';
import type { NodeProps } from '@intlayer/core/interpreter';
import { type FC, type HTMLAttributes, lazy, Suspense } from 'react';
import { useIntlayerContext } from '../client';

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

export type ContentSelectorWrapperProps = NodeProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

const DynamicContentSelectorWrapperContent = lazy(() =>
  import('./ContentSelectorWrapperContent').then((m) => ({
    default: m.ContentSelectorWrapperContent,
  }))
);

export const ContentSelectorRenderer: FC<ContentSelectorWrapperProps> = ({
  children,
  ...props
}) => {
  const { disableEditor } = useIntlayerContext();
  const { editor } = configuration ?? {};
  const isEnabled = editor?.enabled ?? false;

  const isEditorEnabled =
    typeof window !== 'undefined' &&
    isEnabled &&
    !disableEditor &&
    window.self !== window.top;

  if (isEditorEnabled) {
    return (
      <Suspense fallback={children}>
        <DynamicContentSelectorWrapperContent {...props}>
          {children}
        </DynamicContentSelectorWrapperContent>
      </Suspense>
    );
  }

  return children;
};
