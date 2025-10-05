'use client';

import type { Locales } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import { useGetEditorDictionaries } from '@intlayer/design-system/hooks';
import {
  type FileContent,
  MessageKey,
  useCrossFrameState,
  useDictionariesRecordActions,
} from '@intlayer/editor-react';
import { type FC, type PropsWithChildren, useEffect } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';
import { LongPressMessage } from './LongPressMessage';

export const EditorLayout: FC<PropsWithChildren> = ({ children }) => {
  const [currentLocale] = useCrossFrameState<Locales>(
    MessageKey.INTLAYER_CURRENT_LOCALE,
    undefined,
    {
      receive: true,
      emit: false,
    }
  );
  const [hoveredContent] = useCrossFrameState<FileContent | null>(
    MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED,
    null
  );
  const { data: unmergedDictionaries } = useGetEditorDictionaries();

  const { setLocaleDictionaries } = useDictionariesRecordActions();

  useEffect(() => {
    if (!unmergedDictionaries) return;

    const dictionariesList = Object.fromEntries(
      Object.values(unmergedDictionaries as Record<string, Dictionary[]>)
        .flat()
        .map((dictionary) => [dictionary.localId, dictionary])
    );

    setLocaleDictionaries(dictionariesList);
  }, [unmergedDictionaries]);

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
