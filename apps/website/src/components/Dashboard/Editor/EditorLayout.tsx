'use client';

import { type Locales } from '@intlayer/config/client';
import { Container } from '@intlayer/design-system';
import dictionaries from '@intlayer/dictionaries-entry';
import {
  useCrossFrameState,
  useDictionariesRecordActions,
} from '@intlayer/editor-react';
import { useTheme } from 'next-themes';
import { useEffect, type FC, type PropsWithChildren } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';

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

  const { setLocaleDictionaries } = useDictionariesRecordActions();

  useEffect(() => {
    setLocaleDictionaries(dictionaries);
  }, []);

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
