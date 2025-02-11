'use client';

import { type Locales } from '@intlayer/config/client';
import { useConfiguration, useCrossFrameState } from '@intlayer/editor-react';
import type { FC, PropsWithChildren } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';

export const EditorLayout: FC<PropsWithChildren> = ({ children }) => {
  const configuration = useConfiguration();
  const [currentLocale] = useCrossFrameState<Locales>(
    'INTLAYER_CURRENT_LOCALE',
    undefined,
    {
      receive: true,
      emit: false,
    }
  );

  return (
    <div className="bg-card-dark relative size-full p-3">
      {children}
      <DictionaryEditionDrawerController
        locale={currentLocale}
        localeList={configuration.internationalization.locales}
      />
      <DictionaryListDrawer />
    </div>
  );
};
