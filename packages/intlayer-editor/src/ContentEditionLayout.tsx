import type { Locales } from '@intlayer/config/client';
import type { FC, ReactNode } from 'react';
import { IntlayerEditorProvider } from './ContentEditorProvider';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer/index';
import { DictionaryListDrawer } from './DictionaryListDrawer/index';

export type ContentEditionLayoutProps = {
  children?: ReactNode;
  locale: Locales;
  localeList: Locales[];
  setLocale: (locale: Locales) => void;
  editorEnabled?: boolean;
};

export const ContentEditionLayout: FC<ContentEditionLayoutProps> = ({
  children,
  locale,
  setLocale,
  localeList,
  editorEnabled = true,
}) => {
  return (
    <IntlayerEditorProvider editorEnabled={editorEnabled}>
      {children}

      {editorEnabled && (
        <>
          <DictionaryEditionDrawerController
            locale={locale}
            localeList={localeList}
            setLocale={setLocale}
          />
          <DictionaryListDrawer />
        </>
      )}
    </IntlayerEditorProvider>
  );
};
