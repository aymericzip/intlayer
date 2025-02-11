'use client';

import { type Locales } from '@intlayer/config/client';
import { useCrossFrameState } from '@intlayer/editor-react';
import type { FC, PropsWithChildren } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';

export const EditorLayout: FC<PropsWithChildren> = ({ children }) => {
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
      <div className="flex size-full flex-1 flex-col items-center justify-center p-4">
        {children}
      </div>
      <DictionaryEditionDrawerController locale={currentLocale} />
      <DictionaryListDrawer />
    </>
  );
};
