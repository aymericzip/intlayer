'use client';

import { type FC, useRef } from 'react';
import { EditorLayout } from './EditorLayout';
import { EditorProvider } from './EditorProvider';
import { IframeController } from './IframeController';

export const Editor: FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <EditorProvider iframeRef={iframeRef}>
      <EditorLayout>
        <IframeController iframeRef={iframeRef} />
      </EditorLayout>
    </EditorProvider>
  );
};
