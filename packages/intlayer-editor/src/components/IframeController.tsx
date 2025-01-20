'use client';

import { getConfiguration } from '@intlayer/config/client';
import {
  useCrossURLPathState,
  useEditorEnabledState,
} from '@intlayer/editor-react';
import { type FC, RefObject, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const I_FRAME_URL = 'http://localhost:3000';

export const IframeController: FC<{
  iframeRef: RefObject<HTMLIFrameElement>;
}> = ({ iframeRef }) => {
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
    <div className="size-full p-2">
      <iframe
        src={`${I_FRAME_URL}/${location.pathname}`}
        title="Intlayer Application"
        className="size-full rounded-lg"
        ref={iframeRef}
        onLoad={() => {
          const { editor } = getConfiguration();

          if (editor.enabled) {
            setIsEnabled(true);
          }
        }}
      />
    </div>
  );
};
