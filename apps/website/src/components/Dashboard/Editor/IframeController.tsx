'use client';

import { Browser, Container, Loader } from '@intlayer/design-system';
import {
  useConfiguration,
  useCrossURLPathState,
  useGetEditorEnabledState,
  useIframeClickMerger,
  usePostEditorEnabledState,
} from '@intlayer/editor-react';
import { cn } from '@utils/cn';
import { type FC, type RefObject, useState } from 'react';
import { NoApplicationURLView } from './NoApplicationURLView/NoApplicationURLView';
import { useEditedContentPersistence } from './useEditedContentPersistence';

export const IframeController: FC<{
  iframeRef: RefObject<HTMLIFrameElement | null>;
}> = ({ iframeRef }) => {
  const { editor } = useConfiguration();

  const enableEditor = () => postEditorEnabled(true);
  const postEditorEnabled = usePostEditorEnabledState(); // Allow to set the editor enabled state on the client side
  useGetEditorEnabledState(enableEditor); // Listen if the client ask if the editor is connected and send enable state

  useEditedContentPersistence();
  useIframeClickMerger();

  const [iframePath] = useCrossURLPathState(undefined, {
    receive: true,
    emit: false,
  });

  const [loading, setLoading] = useState(false);

  if (!editor.applicationURL) {
    return (
      <Container className="flex max-w-xl flex-col gap-4 p-6">
        <NoApplicationURLView />
      </Container>
    );
  }

  return (
    <div className="contents size-full flex-1">
      <Loader isLoading={loading} />
      <Browser
        path={iframePath}
        initialUrl={editor.applicationURL}
        domainRestriction={editor.applicationURL}
        className={cn(
          'size-full flex-1 overflow-hidden rounded-lg',
          loading && 'hidden'
        )}
        sandbox="allow-scripts allow-same-origin"
        ref={iframeRef}
        onLoad={() => {
          setLoading(false);
          enableEditor();
        }}
      />
    </div>
  );
};
