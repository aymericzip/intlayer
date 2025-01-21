'use client';

import { getConfiguration } from '@intlayer/config/client';
import { Loader } from '@intlayer/design-system';
import {
  useCrossURLPathState,
  useEditorEnabledState,
  useIframeClickMerger,
} from '@intlayer/editor-react';
import { type FC, type RefObject, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';

const I_FRAME_URL = 'http://localhost:3000';

export const IframeController: FC<{
  iframeRef: RefObject<HTMLIFrameElement>;
}> = ({ iframeRef }) => {
  useIframeClickMerger();

  const [loading, setLoading] = useState(true);

  /**
   * We need to enable the editor to receive messages from the iframe
   */
  const [_isEnabled, setIsEnabled] = useEditorEnabledState({
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
    <div className="size-full overflow-hidden rounded-lg bg-white">
      <Loader isLoading={loading} />
      <iframe
        src={`${I_FRAME_URL}/${location.pathname}`}
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
