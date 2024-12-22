'use client';

import { appLogger, getConfiguration } from '@intlayer/config/client';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer/index';
import { DictionaryListDrawer } from './DictionaryListDrawer/index';
import { useIntlayerContext } from 'react-intlayer';
import { useContentSelectorContext } from 'react-intlayer/editor';
import { ContentSelectorWrapper } from './ContentSelectorWrapper';
import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';

type IntlayerEditorValue = {
  isEditorEnabled: boolean;
};

/**
 * Context that store the current locale on the client side
 */
export const IntlayerEditorContext = createContext<IntlayerEditorValue>({
  isEditorEnabled: false,
});

/**
 * Hook that provides the current locale
 */
export const useIntlayerEditorContext = () => useContext(IntlayerEditorContext);

export type IntlayerEditorProviderProps = PropsWithChildren<{
  isEnabled?: boolean;
}>;

/**
 * Provider that store the current locale on the client side
 */
export const IntlayerEditorProvider: FC<IntlayerEditorProviderProps> = ({
  children,
  isEnabled = true,
}) => {
  const { editor, internationalization } = getConfiguration();

  const { setState } = useContentSelectorContext();

  const { locale, setLocale } = useIntlayerContext();

  const isEditorEnabled = useMemo(
    () =>
      Boolean(
        editor.enabled && editor.clientId && editor.clientSecret && isEnabled
      ),
    [editor.enabled && editor.clientId && editor.clientSecret && isEnabled]
  );

  useEffect(() => {
    setState({
      ContentSelectorWrapper,
    });
  }, [setState]);

  useEffect(() => {
    if (isEnabled && editor.enabled) {
      if (!editor.clientId) {
        appLogger(
          'Editor is enabled but clientId is not set. Please set it in the editor configuration. See http://localhost:3000/doc/concept/editor.',
          {
            level: 'error',
          }
        );
      }

      if (!editor.clientSecret) {
        appLogger(
          'Editor is enabled but clientSecret is not set. Please set it in the editor configuration. See http://localhost:3000/doc/concept/editor.',
          {
            level: 'error',
          }
        );
      }
    }
  }, [isEnabled, editor.enabled, editor.clientId, editor.clientSecret]);

  return (
    <IntlayerEditorContext.Provider value={{ isEditorEnabled }}>
      {children}

      {isEditorEnabled && (
        <>
          <DictionaryEditionDrawerController
            locale={locale}
            localeList={internationalization.locales}
            setLocale={setLocale}
          />
          <DictionaryListDrawer />
        </>
      )}
    </IntlayerEditorContext.Provider>
  );
};
