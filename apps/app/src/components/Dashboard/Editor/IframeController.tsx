import { Browser } from '@intlayer/design-system/browser';
import { Container } from '@intlayer/design-system/container';
import { FrameConnectionError } from '@intlayer/design-system/frame-connection-error';
import {
  useConfiguration,
  useCrossURLPathState,
  useEditedContentPersistence,
  useEditorPingClient,
  useFrameConnectionStatus,
} from '@intlayer/editor-react';
import { type FC, type RefObject, useEffect } from 'react';
import { useEditorPagesSidebar } from '#hooks/useEditorPagesSidebar';
import { useSearchParamState } from '#hooks/useSearchParamState';
import { NoApplicationURLView } from './NoApplicationURLView/NoApplicationURLView';

export const IframeController: FC<{
  iframeRef: RefObject<HTMLIFrameElement | null>;
}> = ({ iframeRef }) => {
  const { editor } = useConfiguration() ?? {};
  const pingClient = useEditorPingClient();
  const { isConnectionFailed, handleFrameLoad, dismiss } =
    useFrameConnectionStatus();

  useEditedContentPersistence();

  const { params, setParam } = useSearchParamState({
    path: { type: 'string', fallbackValue: undefined },
  });

  const { trackVisit } = useEditorPagesSidebar();

  const iframePath = useCrossURLPathState();

  useEffect(() => {
    if (iframePath) {
      setParam('path', iframePath);
      trackVisit(iframePath);
    }
  }, [iframePath, setParam, trackVisit]);

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

  return (
    <div className="relative flex size-full flex-1 overflow-hidden rounded-lg">
      <Browser
        path={params.path || iframePath}
        initialUrl={editor.applicationURL}
        domainRestriction={editor.applicationURL}
        className="size-full flex-1 overflow-hidden rounded-lg"
        sandbox="allow-scripts allow-same-origin"
        ref={iframeRef}
        onLoad={() => {
          pingClient();
          handleFrameLoad();
        }}
      />
      {isConnectionFailed && (
        <FrameConnectionError
          applicationURL={editor.applicationURL}
          onRetry={reloadFrame}
          onDismiss={dismiss}
        />
      )}
    </div>
  );
};
