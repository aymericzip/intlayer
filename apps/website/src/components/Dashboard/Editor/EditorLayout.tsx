'use client';

import { type Locales } from '@intlayer/config/client';
import { useCrossFrameState } from '@intlayer/editor-react';
import { useTheme } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';
import { Container } from '@intlayer/design-system';

export const EditorLayout: FC<PropsWithChildren> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [currentLocale] = useCrossFrameState<Locales>(
    'INTLAYER_CURRENT_LOCALE',
    undefined,
    {
      receive: true,
      emit: false,
    }
  );

  return (
    <>
      <Container
        background="none"
        border
        roundedSize="2xl"
        className="size-full flex-1 flex-col items-center justify-center overflow-hidden"
      >
        {children}
      </Container>

      <DictionaryEditionDrawerController
        locale={currentLocale}
        isDarkMode={resolvedTheme === 'dark'}
      />
      <DictionaryListDrawer />
    </>
  );
};
