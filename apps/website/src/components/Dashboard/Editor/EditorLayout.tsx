'use client';

import type { IntlayerConfig, Locales } from '@intlayer/config/client';
import { normalizeDictionaries } from '@intlayer/core';
import { Container } from '@intlayer/design-system';
import {
  type FileContent,
  MessageKey,
  useCrossFrameState,
  useDictionariesRecordActions,
} from '@intlayer/editor-react';
import unmergedDictionaries from '@intlayer/unmerged-dictionaries-entry';
import { useTheme } from 'next-themes';
import { type FC, type PropsWithChildren, useEffect } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';
import { LongPressMessage } from './LongPressMessage';

type EditorLayoutProps = PropsWithChildren<{ configuration: IntlayerConfig }>;

export const EditorLayout: FC<EditorLayoutProps> = ({
  children,
  configuration,
}) => {
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
        .flatMap((dictionaries) =>
          normalizeDictionaries(dictionaries, configuration)
        )
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
