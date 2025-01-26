'use client';

import { getConfiguration } from '@intlayer/config/client';
import { Loader } from '@intlayer/design-system';
import {
  useConfiguration,
  useCrossURLPathState,
  useEditorEnabledState,
  useIframeClickMerger,
} from '@intlayer/editor-react';
import { type FC, type RefObject, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEditedContentPersistence } from '../hooks/useEditedContentPersistence';
import { cn } from '../utils/cn';

export const IframeController: FC<{
  iframeRef: RefObject<HTMLIFrameElement>;
}> = ({ iframeRef }) => {
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

  const location = useLocation();
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

  return (
    <div className="size-full overflow-hidden rounded-lg">
      <Loader isLoading={loading} />
      <iframe
        src={`${editor.applicationURL}/${location.pathname}`}
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
