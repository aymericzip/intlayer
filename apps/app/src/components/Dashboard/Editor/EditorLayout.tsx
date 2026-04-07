'use client';

import { Container } from '@intlayer/design-system/container';
import { useTheme } from '#/providers/ThemeProvider';
import type { FC, PropsWithChildren } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';
import { LongPressMessage } from './LongPressMessage';

type EditorLayoutProps = PropsWithChildren;

export const EditorLayout: FC<EditorLayoutProps> = ({ children }) => {
  const { resolvedTheme } = useTheme();

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
          <LongPressMessage />
        </div>
      </Container>
      <DictionaryEditionDrawerController
        isDarkMode={resolvedTheme === 'dark'}
      />
      <DictionaryListDrawer />
    </>
  );
};
