'use client';

import { getConfiguration } from '@intlayer/config/client';
import { Container, Loader } from '@intlayer/design-system';
import {
  useConfiguration,
  useCrossURLPathState,
  useEditorEnabledState,
  useIframeClickMerger,
} from '@intlayer/editor-react';
import { type FC, type RefObject, useEffect, useState } from 'react';
import { useEditedContentPersistence } from '../../hooks/useEditedContentPersistence';
import { cn } from '../../utils/cn';
import { NoApplicationURLView } from './NoApplicationURLView/NoApplicationURLView';

export const IframeController: FC<{
  iframeRef: RefObject<HTMLIFrameElement | null>;
  applicationPath: string;
}> = ({ iframeRef, applicationPath }) => {
  const { editor } = useConfiguration();

  useIframeClickMerger();
  useEditedContentPersistence();

  const [loading, setLoading] = useState(false);

  /**
   * We need to enable the editor to receive messages from the iframe
   */
  const [, setIsEnabled] = useEditorEnabledState({
    emit: true,
    receive: false,
  });

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

  if (!editor.applicationURL) {
    return (
      <div className="flex size-full items-center justify-center">
        <Container className="flex max-w-xl flex-col gap-4 p-6">
          <NoApplicationURLView />
        </Container>
      </div>
    );
  }

  return (
    <div className="size-full overflow-hidden rounded-lg">
      <Loader isLoading={loading} />
      <iframe
        src={`${editor.applicationURL}${applicationPath}`}
        title="Intlayer Application"
        className={cn('size-full', loading && 'hidden')}
        ref={iframeRef}
        onLoad={() => {
          setLoading(false);
          const { editor } = getConfiguration();

          if (editor.enabled) {
            setIsEnabled(true);
          }
        }}
      />
    </div>
  );
};
