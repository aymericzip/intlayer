'use client';

import { Browser, Button, Container, Loader } from '@intlayer/design-system';
import {
  useConfiguration,
  useCrossURLPathState,
  useEditorEnabled,
  useGetEditorEnabledState,
  useIframeClickMerger,
  usePostEditorEnabledState,
} from '@intlayer/editor-react';
import { cn } from '@utils/cn';
import { useIntlayer } from 'next-intlayer';
import { type FC, type RefObject, useState } from 'react';
import { NoApplicationURLView } from './NoApplicationURLView/NoApplicationURLView';
import { useEditedContentPersistence } from './useEditedContentPersistence';

export const IframeController: FC<{
  iframeRef: RefObject<HTMLIFrameElement | null>;
}> = ({ iframeRef }) => {
  const content = useIntlayer('iframe-controller');

  const { editor } = useConfiguration();

  // Post - Allow to set the editor enabled state on the client side
  const postEditorEnabled = usePostEditorEnabledState();

  // Enable the editor depending of the configuration
  const enableEditor = () => postEditorEnabled(editor.enabled);

  // State received from the client
  const { enabled } = useEditorEnabled();

  // Listen if the client ask if the editor is connected and send enable state
  useGetEditorEnabledState(enableEditor);

  useEditedContentPersistence();
  useIframeClickMerger();

  const [iframePath] = useCrossURLPathState(undefined, {
    receive: true,
    emit: false,
  });

  const [loading, setLoading] = useState(false);

  if (!editor.applicationURL) {
    return (
      <Container className="max-w-xl" padding="xl" roundedSize="2xl">
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
      {!enabled && (
        <div className="fixed right-4 bottom-4">
          <Button
            label={content.enableEditor.value}
            onClick={enableEditor}
            color="text"
          >
            {content.enableEditor}
          </Button>
        </div>
      )}
    </div>
  );
};
