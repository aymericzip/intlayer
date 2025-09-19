'use client';

import { type Locales } from '@intlayer/config/client';
import { Container } from '@intlayer/design-system';
import {
  FileContent,
  MessageKey,
  useCrossFrameState,
  useDictionariesRecordActions,
} from '@intlayer/editor-react';
import unmergedDictionaries from '@intlayer/unmerged-dictionaries-entry';
import { useTheme } from 'next-themes';
import { useEffect, type FC, type PropsWithChildren } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';
import { LongPressMessage } from './LongPressMessage';

export const EditorLayout: FC<PropsWithChildren> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [hoveredContent] = useCrossFrameState<FileContent | null>(
    MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED,
    null
  );
  const [currentLocale] = useCrossFrameState<Locales>(
    MessageKey.INTLAYER_CURRENT_LOCALE,
    undefined,
    {
      receive: true,
      emit: false,
    }
  );

  const { setLocaleDictionaries } = useDictionariesRecordActions();

  useEffect(() => {
    const dictionariesList = Object.fromEntries(
      Object.values(unmergedDictionaries)
        .flat()
        .map((dictionary) => [dictionary.localId, dictionary])
    );

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
        <div className="absolute bottom-2 right-2">
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
