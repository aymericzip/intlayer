import { Browser } from '@intlayer/design-system/browser';
import { Container } from '@intlayer/design-system/container';
import { Loader } from '@intlayer/design-system/loader';
import { cn } from '@intlayer/design-system/utils';
import {
  useConfiguration,
  useCrossURLPathState,
  useGetEditorEnabledState,
  useIframeClickMerger,
  usePostEditorEnabledState,
} from '@intlayer/editor-react';
import { type FC, type RefObject, useEffect, useState } from 'react';
import { useEditorPagesSidebar } from '#hooks/useEditorPagesSidebar';
import { useSearchParamState } from '#hooks/useSearchParamState';
import { NoApplicationURLView } from './NoApplicationURLView/NoApplicationURLView';
import { useEditedContentPersistence } from './useEditedContentPersistence';

export const IframeController: FC<{
  iframeRef: RefObject<HTMLIFrameElement | null>;
}> = ({ iframeRef }) => {
  const { editor } = useConfiguration() ?? {};

  const enableEditor = () => postEditorEnabled(true);
  const postEditorEnabled = usePostEditorEnabledState(); // Allow to set the editor enabled state on the client side

  useGetEditorEnabledState(enableEditor); // Listen if the client ask if the editor is connected and send enable state
  useEditedContentPersistence();
  useIframeClickMerger();

  const { params, setParam } = useSearchParamState({
    path: { type: 'string', fallbackValue: undefined },
  });

  const { trackVisit } = useEditorPagesSidebar();

  const [iframePath] = useCrossURLPathState(undefined, {
    receive: true,
    emit: false,
  });

  useEffect(() => {
    if (iframePath) {
      setParam('path', iframePath);
      trackVisit(iframePath);
    }
  }, [iframePath, setParam, trackVisit]);

  const [loading, setLoading] = useState(false);

  if (!editor?.applicationURL) {
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
        path={params.path || iframePath}
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
