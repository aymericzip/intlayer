'use client';

import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Loader } from '@intlayer/design-system/loader';
import { cn } from '@intlayer/design-system/utils';
import {
  useConfiguration,
  useCrossURLPathState,
  useEditorEnabled,
  useEditorPingClient,
  useIframeClickMerger,
} from '@intlayer/editor-react';
import { type FC, type RefObject, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useEditedContentPersistence } from '../../hooks/useEditedContentPersistence';
import { NoApplicationURLView } from './NoApplicationURLView/NoApplicationURLView';

export const IframeController: FC<{
  iframeRef: RefObject<HTMLIFrameElement | null>;
  applicationPath: string;
}> = ({ iframeRef, applicationPath }) => {
  const content = useIntlayer('iframe-controller');
  const { editor } = useConfiguration() ?? {};

  // Enabled state driven by the new CLIENT_READY → EDITOR_ACTIVATE handshake
  const { enabled } = useEditorEnabled();
  const pingClient = useEditorPingClient();

  useEditedContentPersistence();
  useIframeClickMerger();

  const [loading, setLoading] = useState(true);

  /**
   * We need to enable the editor to receive messages from the iframe
   */
  const [iframePath] = useCrossURLPathState(undefined, {
    receive: true,
    emit: false,
  });

  useEffect(() => {
    if (typeof iframePath !== 'string') return;

    /**
     * replace the current history entry with the new URL but will not trigger React Router to navigate to a new route,
     * nor will it unmount/remount components
     */
    window.history.replaceState({}, '', iframePath);
  }, [iframePath]);

  if (!editor?.applicationURL) {
    return (
      <Container className="max-w-xl" padding="xl" roundedSize="2xl">
        <NoApplicationURLView />
      </Container>
    );
  }

  return (
    <div className="relative size-full overflow-hidden rounded-lg">
      <Loader isLoading={loading} />
      <iframe
        src={`${editor.applicationURL}${applicationPath}`}
        title={content.intlayerApplication.value}
        sandbox="allow-scripts allow-same-origin"
        className={cn('size-full', loading && 'hidden')}
        ref={iframeRef}
        onLoad={() => {
          setLoading(false);
        }}
      />
      {!enabled && (
        <div className="fixed right-4 bottom-4">
          <Button
            label={content.enableEditor.value}
            onClick={pingClient}
            color="text"
          >
            {content.enableEditor}
          </Button>
        </div>
      )}
    </div>
  );
};
