'use client';

import {
  type FileContent,
  MessageKey,
  useCrossFrameState,
  useEditorLocale,
} from '@intlayer/editor-react';
import type { FC, PropsWithChildren } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';
import { LongPressMessage } from './LongPressMessage';

export const EditorLayout: FC<PropsWithChildren> = ({ children }) => {
  const currentLocale = useEditorLocale();
  const [hoveredContent] = useCrossFrameState<FileContent | null>(
    MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED,
    null
  );

  return (
    <div className="relative size-full bg-card p-3">
      {children}
      <div className="absolute right-2 bottom-2">
        <LongPressMessage {...hoveredContent} />
      </div>
      <DictionaryEditionDrawerController locale={currentLocale} />
      <DictionaryListDrawer />
    </div>
  );
};
