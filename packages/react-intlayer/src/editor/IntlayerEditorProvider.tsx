import configuration from '@intlayer/config/built';
import { type FC, lazy, type PropsWithChildren, Suspense } from 'react';

const DynamicEditorProvider = lazy(() =>
  import('@intlayer/editor-react').then((m) => ({ default: m.EditorProvider }))
);

/**
 * Wraps the application with the Intlayer editor provider in client mode.
 * All configuration (URLs, origins) is read from @intlayer/config/built.
 */
export const IntlayerEditorProvider: FC<PropsWithChildren> = ({ children }) => {
  const { editor } = configuration ?? {};
  const isEnabled = editor?.enabled ?? false;

  if (typeof window === 'undefined' || !isEnabled) {
    return <>{children}</>;
  }

  return (
    <Suspense fallback={children}>
      <DynamicEditorProvider mode="client">{children}</DynamicEditorProvider>
    </Suspense>
  );
};
