'use client';

import { useGetEditorDictionaries } from '@intlayer/design-system/hooks';
import {
  type FileContent,
  MessageKey,
  useCrossFrameState,
  useDictionariesRecordActions,
  useEditorLocale,
} from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types';
import { type FC, type PropsWithChildren, useEffect } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';
import { LongPressMessage } from './LongPressMessage';

export const EditorLayout: FC<PropsWithChildren> = ({ children }) => {
  const currentLocale = useEditorLocale();
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
