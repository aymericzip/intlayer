import { Browser } from '@intlayer/design-system/browser';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { FrameConnectionError } from '@intlayer/design-system/frame-connection-error';
import { Loader } from '@intlayer/design-system/loader';
import { cn } from '@intlayer/design-system/utils';
import {
  useConfiguration,
  useCrossURLPathState,
  useEditedContentPersistence,
  useEditorEnabled,
  useEditorPingClient,
  useFrameConnectionStatus,
} from '@intlayer/editor-react';
import type { FunctionComponent, RefObject } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useIntlayer } from 'preact-intlayer';
import { ApplicationLocaleSwitcher } from './ApplicationLocaleSwitcher';
import { EditorProfile } from './EditorProfile';
import { NoApplicationURLView } from './NoApplicationURLView/NoApplicationURLView';

export const IframeController: FunctionComponent<{
  iframeRef: RefObject<HTMLIFrameElement | null>;
  applicationPath: string;
  /** Wraps the application frame in a browser bar (URL input, history). */
  isBrowserVisible?: boolean;
}> = ({ iframeRef, applicationPath, isBrowserVisible = false }) => {
  const content = useIntlayer('iframe-controller');
  const { editor } = useConfiguration() ?? {};

  // Enabled state driven by the new CLIENT_READY → EDITOR_ACTIVATE handshake
  const { enabled } = useEditorEnabled();
  const pingClient = useEditorPingClient();
  const { isConnectionFailed, handleFrameLoad, dismiss } =
    useFrameConnectionStatus();

  useEditedContentPersistence();

  const [loading, setLoading] = useState(true);

  const iframePath = useCrossURLPathState();

  useEffect(() => {
    if (typeof iframePath !== 'string') return;

    /**
     * replace the current history entry with the new URL but will not trigger React Router to navigate to a new route,
     * nor will it unmount/remount components
     */
    // Keep the editor query (e.g. the `browser` flag) across reloads
    window.history.replaceState(
      {},
      '',
      `${iframePath}${window.location.search}`
    );
  }, [iframePath]);

  if (!editor?.applicationURL) {
    return (
      <Container className="max-w-xl" padding="xl" roundedSize="2xl">
        <NoApplicationURLView />
      </Container>
    );
  }

  const reloadFrame = () => {
    const iframe = iframeRef.current;

    if (!iframe) return;

    const { src } = iframe;
    iframe.src = src;
  };

  const connectionError = isConnectionFailed && (
    <FrameConnectionError
      applicationURL={editor.applicationURL}
      onRetry={reloadFrame}
      onDismiss={dismiss}
    />
  );

  const enableEditorButton = !enabled && (
    <div className="fixed inset-e-4 bottom-4">
      <Button
        label={content.enableEditor.value}
        onClick={pingClient}
        color="text"
      >
        {content.enableEditor}
      </Button>
    </div>
  );

  const toolbarActions = (
    <div className="flex shrink-0 items-center gap-2">
      <ApplicationLocaleSwitcher
        iframeRef={iframeRef}
        applicationURL={editor.applicationURL}
        applicationPath={applicationPath}
      />
      <EditorProfile />
    </div>
  );

  if (isBrowserVisible) {
    return (
      <div className="relative size-full overflow-hidden rounded-lg">
        <Browser
          initialUrl={`${editor.applicationURL}${applicationPath}`}
          path={iframePath}
          domainRestriction={editor.applicationURL}
          className="size-full"
          sandbox="allow-scripts allow-same-origin"
          ref={iframeRef}
          onLoad={handleFrameLoad}
          toolbarActions={toolbarActions}
        />
        {connectionError}
        {enableEditorButton}
      </div>
    );
  }

  return (
    <div className="flex size-full flex-col gap-2">
      <div className="flex justify-end">{toolbarActions}</div>
      <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-lg">
        <Loader isLoading={loading} />
        <iframe
          src={`${editor.applicationURL}${applicationPath}`}
          title={content.intlayerApplication.value}
          sandbox="allow-scripts allow-same-origin"
          className={cn('size-full', loading && 'hidden')}
          ref={iframeRef}
          onLoad={() => {
            setLoading(false);
            handleFrameLoad();
          }}
        />
        {connectionError}
        {enableEditorButton}
      </div>
    </div>
  );
};
