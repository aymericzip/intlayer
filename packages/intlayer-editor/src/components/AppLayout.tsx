'use client';

import { getConfiguration } from '@intlayer/config/client';
import { FC, PropsWithChildren } from 'react';
import { useIntlayerContext } from 'react-intlayer';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const { internationalization } = getConfiguration();
  const { locale, setLocale } = useIntlayerContext();

  return (
    <div className="bg-card-dark dark:bg-card relative size-full p-3">
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
