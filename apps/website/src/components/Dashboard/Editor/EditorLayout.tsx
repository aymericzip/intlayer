'use client';

import { type Locales } from '@intlayer/config/client';
import { Container } from '@intlayer/design-system';
import {
  useCrossFrameState,
  useDictionariesRecordActions,
} from '@intlayer/editor-react';
import unmergedDictionaries from '@intlayer/unmerged-dictionaries-entry';
import { useTheme } from 'next-themes';
import { useEffect, type FC, type PropsWithChildren } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';
import { mergeDictionaries } from './mergeDictionaries';

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
    const dictionariesList = Object.fromEntries(
      Object.entries(unmergedDictionaries).map(([key, value]) => [
        key,
        mergeDictionaries(value),
      ])
    );

    console.log({ dictionariesList, unmergedDictionaries });

    setLocaleDictionaries(dictionariesList);
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
