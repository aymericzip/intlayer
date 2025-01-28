'use client';

import { Loader } from '@intlayer/design-system';
import {
  useConfiguration,
  useEditorEnabledState,
  useIframeClickMerger,
} from '@intlayer/editor-react';
import { cn } from '@utils/cn';
import { type FC, type RefObject, useState } from 'react';
import { useEditedContentPersistence } from './useEditedContentPersistence';

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

  return (
    <div className="contents size-full flex-1">
      <Loader isLoading={loading} />
      <iframe
        src={editor.applicationURL}
        title="Intlayer Application"
        className={cn(
          'size-full flex-1 overflow-hidden rounded-lg',
          loading && 'hidden'
        )}
        ref={iframeRef}
        onLoad={() => {
          setLoading(false);
          setIsEnabled(true);
        }}
      />
    </div>
  );
};
