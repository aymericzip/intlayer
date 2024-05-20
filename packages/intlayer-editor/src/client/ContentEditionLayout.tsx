import type { Locales } from '@intlayer/config/client';
import type { FC, ReactNode } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer/index';
import { DictionaryListDrawer } from './DictionaryListDrawer/index';
import { IntlayerEditorStringReplacer } from './IntlayerEditorStringReplacer/index';

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
    <IntlayerEditorStringReplacer>{children}</IntlayerEditorStringReplacer>
    <DictionaryEditionDrawerController
      locale={locale}
      localeList={localeList}
      setLocale={setLocale}
    />
    <DictionaryListDrawer />
  </>
);
