'use client';

import { type Locales } from '@intlayer/config/client';
import { MessageKey, useCrossFrameState } from '@intlayer/editor-react';
import { type FC, type PropsWithChildren } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';

export const EditorLayout: FC<PropsWithChildren> = ({ children }) => {
  const [currentLocale] = useCrossFrameState<Locales>(
    MessageKey.INTLAYER_CURRENT_LOCALE,
    undefined,
    {
      receive: true,
      emit: false,
    }
  );

  return (
    <div className="bg-card relative size-full p-3">
      {children}
      <DictionaryEditionDrawerController locale={currentLocale} />
      <DictionaryListDrawer />
    </div>
  );
};
