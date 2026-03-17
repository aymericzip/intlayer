import configuration from '@intlayer/config/built';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { lazy, Suspense } from 'preact/compat';

const DynamicEditorProvider = lazy(() =>
  import('./EditorProvider').then((m) => ({ default: m.EditorProvider }))
);

export const IntlayerEditorProvider: FunctionComponent<{
  children?: ComponentChildren;
}> = ({ children }) => {
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
