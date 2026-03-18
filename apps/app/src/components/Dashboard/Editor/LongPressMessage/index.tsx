'use client';

import {
  type FileContent,
  MessageKey,
  useCrossFrameState,
} from '@intlayer/editor-react';
import { cn } from '@utils/cn';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

export const LongPressMessage: FC = () => {
  const { message } = useIntlayer('long-press-message');
  const [hoveredContent] = useCrossFrameState<FileContent | null>(
    MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED,
    null
  );

  return (
    <div
      className={cn(
        'rounded-2xl bg-neutral/30 px-3 py-1 font-bold text-sm text-text transition-opacity duration-100',
        hoveredContent?.dictionaryKey ? 'opacity-100' : 'opacity-0'
      )}
    >
      {hoveredContent?.dictionaryKey
        ? message({ dictionaryKey: hoveredContent.dictionaryKey })
        : ''}
    </div>
  );
};
