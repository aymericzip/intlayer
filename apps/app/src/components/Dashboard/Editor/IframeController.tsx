import { Browser } from '@intlayer/design-system/browser';
import { Container } from '@intlayer/design-system/container';
import {
  useConfiguration,
  useCrossURLPathState,
  useEditedContentPersistence,
  useEditorPingClient,
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

  return (
    <div className="contents size-full flex-1">
      <Browser
        path={params.path || iframePath}
        initialUrl={editor.applicationURL}
        domainRestriction={editor.applicationURL}
        className="size-full flex-1 overflow-hidden rounded-lg"
        sandbox="allow-scripts allow-same-origin"
        ref={iframeRef}
        onLoad={pingClient}
      />
    </div>
  );
};
