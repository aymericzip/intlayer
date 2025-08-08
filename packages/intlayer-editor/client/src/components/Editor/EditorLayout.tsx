'use client';

import { type Locales } from '@intlayer/config/client';
import { useGetEditorDictionaries } from '@intlayer/design-system/hooks';
import {
  FileContent,
  MessageKey,
  useCrossFrameState,
  useDictionariesRecordActions,
} from '@intlayer/editor-react';
import { useEffect, type FC, type PropsWithChildren } from 'react';
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
  const { data: localeDictionaries } = useGetEditorDictionaries({
    autoFetch: true,
  });

  const { setLocaleDictionaries } = useDictionariesRecordActions();

  useEffect(() => {
    if (!localeDictionaries) return;

    setLocaleDictionaries(localeDictionaries);
  }, [localeDictionaries]);

  return (
    <div className="bg-card relative size-full p-3">
      {children}
      <div className="absolute bottom-2 right-2">
        <LongPressMessage {...hoveredContent} />
      </div>
      <DictionaryEditionDrawerController locale={currentLocale} />
      <DictionaryListDrawer />
    </div>
  );
};
