'use client';

import type { IntlayerConfig } from '@intlayer/config';
import { type FC, useRef } from 'react';
import { EditorLayout } from './EditorLayout';
import { EditorProvider } from './EditorProvider';
import { IframeController } from './IframeController';

type EditorProps = {
  configuration?: IntlayerConfig;
};

export const Editor: FC<EditorProps> = ({ configuration }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <EditorProvider iframeRef={iframeRef} configuration={configuration}>
      <EditorLayout>
        <IframeController iframeRef={iframeRef} />
      </EditorLayout>
    </EditorProvider>
  );
};
