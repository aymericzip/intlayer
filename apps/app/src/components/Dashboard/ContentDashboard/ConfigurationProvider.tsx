import { useSession } from '@intlayer/design-system/hooks';
import { EditorProvider } from '@intlayer/editor-react';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { FC, PropsWithChildren } from 'react';

/**
 * Provides a standalone EditorStateManager (no iframe) for the content
 * dashboard routes. Without this, hooks such as `useDictionariesRecordActions`
 * and `useEditedContent` — which all call `useEditorStateManager()` internally
 * — receive a null manager and silently become no-ops, so edits are never
 * tracked and the Save button never appears.
 *
 * `postMessage` and `allowedOrigins` are left as no-ops / empty because the
 * content dashboard communicates with the Intlayer backend directly and has no
 * embedded application iframe to talk to.
 */
export const EditorConfigurationProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { session } = useSession();
  const configuration = session?.project?.configuration as
    | IntlayerConfig
    | undefined;

  return (
    <EditorProvider
      configuration={configuration ?? ({} as IntlayerConfig)}
      postMessage={() => {}}
      allowedOrigins={[]}
    >
      {children}
    </EditorProvider>
  );
};
