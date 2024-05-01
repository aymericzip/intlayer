import type { Locales } from '@intlayer/config/client';
import type { FC, ReactNode } from 'react';
import { EditionPanel } from './EditionPanel/index';

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
    <EditionPanel
      locale={locale}
      localeList={localeList}
      setLocale={setLocale}
    />
  </>
);
