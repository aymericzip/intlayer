'use client';

import { FC, PropsWithChildren } from 'react';
import { useIntlayerContext } from 'react-intlayer';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';
import { getConfiguration } from '@intlayer/config/client';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const { internationalization } = getConfiguration();
  const { locale, setLocale } = useIntlayerContext();

  return (
    <div className="relative size-full bg-orange-400 p-3">
      {children}
      <DictionaryEditionDrawerController
        locale={locale}
        localeList={internationalization.locales}
        setLocale={setLocale}
      />
      <DictionaryListDrawer />
    </div>
  );
};
