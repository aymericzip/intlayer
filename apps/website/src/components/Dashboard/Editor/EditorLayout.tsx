'use client';

import { Container } from '@intlayer/design-system';
import {
  type FileContent,
  MessageKey,
  useCrossFrameState,
  useEditorLocale,
} from '@intlayer/editor-react';
import { useTheme } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';
import { LongPressMessage } from './LongPressMessage';

type EditorLayoutProps = PropsWithChildren;

export const EditorLayout: FC<EditorLayoutProps> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [hoveredContent] = useCrossFrameState<FileContent | null>(
    MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED,
    null
  );
  const currentLocale = useEditorLocale();

  return (
    <>
      <Container
        background="none"
        border
        roundedSize="2xl"
        className="size-full flex-1 flex-col items-center justify-center overflow-hidden"
      >
        {children}
        <div className="absolute right-2 bottom-2">
          <LongPressMessage {...hoveredContent} />
        </div>
      </Container>
      <DictionaryEditionDrawerController
        locale={currentLocale}
        isDarkMode={resolvedTheme === 'dark'}
      />
      <DictionaryListDrawer />
    </>
  );
};
