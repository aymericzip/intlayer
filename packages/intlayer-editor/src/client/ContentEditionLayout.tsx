import type { Locales } from '@intlayer/config/client';
import type { FC, ReactNode } from 'react';
import { DictionaryEditionDrawer } from './DictionaryEditionDrawer/index';

export type ContentEditionLayoutProps = {
  children?: ReactNode;
  locale: Locales;
  localeList: Locales[];
  setLocale: (locale: Locales) => void;
};

export const ContentEditionLayout: FC<ContentEditionLayoutProps> = ({
  children,
  locale,
  setLocale,
  localeList,
}) => (
  <>
    {children}
    <DictionaryEditionDrawer
      locale={locale}
      localeList={localeList}
      setLocale={setLocale}
    />
  </>
);
