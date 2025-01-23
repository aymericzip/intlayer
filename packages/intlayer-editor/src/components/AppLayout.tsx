'use client';

import { getConfiguration, type Locales } from '@intlayer/config/client';
import { useCrossFrameState } from '@intlayer/editor-react';
import { FC, PropsWithChildren } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const { internationalization } = getConfiguration();
  const [currentLocale] = useCrossFrameState<Locales>(
    'INTLAYER_CURRENT_LOCALE',
    undefined,
    {
      receive: true,
      emit: false,
    }
  );

  return (
    <div className="bg-card-dark dark:bg-card relative size-full p-3">
      {children}
      <DictionaryEditionDrawerController
        locale={currentLocale}
        localeList={internationalization.locales}
      />
      <DictionaryListDrawer />
    </div>
  );
};
