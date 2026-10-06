import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Loader } from '@intlayer/design-system/loader';
import { cn } from '@intlayer/design-system/utils';
import {
  useConfiguration,
  useCrossURLPathState,
  useEditedContentPersistence,
  useEditorEnabled,
  useEditorPingClient,
} from '@intlayer/editor-react';
import type { FunctionComponent, RefObject } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useIntlayer } from 'preact-intlayer';
import { NoApplicationURLView } from './NoApplicationURLView/NoApplicationURLView';

export const IframeController: FunctionComponent<{
  iframeRef: RefObject<HTMLIFrameElement | null>;
  applicationPath: string;
}> = ({ iframeRef, applicationPath }) => {
  const content = useIntlayer('iframe-controller');
  const { editor } = useConfiguration() ?? {};

  // Enabled state driven by the new CLIENT_READY → EDITOR_ACTIVATE handshake
  const { enabled } = useEditorEnabled();
  const pingClient = useEditorPingClient();

  useEditedContentPersistence();

  const [loading, setLoading] = useState(true);

  const iframePath = useCrossURLPathState();

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
        <div className="fixed inset-e-4 bottom-4">
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
