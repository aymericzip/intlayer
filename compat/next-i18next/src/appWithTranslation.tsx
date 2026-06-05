import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { ComponentType } from 'react';
import { IntlayerProvider } from 'react-intlayer';

/**
 * Drop-in replacement for next-i18next's `appWithTranslation` HOC.
 *
 * Wraps the Next.js `App` component in `IntlayerProvider` and passes the
 * active locale from `_nextI18Next.initialLocale` or the Next.js router.
 *
 * @example
 * ```tsx
 * export default appWithTranslation(MyApp);
 * ```
 */
export const appWithTranslation = (
  WrappedApp: ComponentType<any>,
  _configOverride?: Record<string, any>
): ComponentType<any> => {
  const AppWithTranslation = ({ pageProps, ...props }: Record<string, any>) => {
    const locale: string | undefined =
      pageProps?._nextI18Next?.initialLocale ?? props?.router?.locale;

    return (
      <IntlayerProvider locale={locale as LocalesValues}>
        <WrappedApp pageProps={pageProps} {...props} />
      </IntlayerProvider>
    );
  };

  AppWithTranslation.displayName = `appWithTranslation(${
    WrappedApp.displayName ?? WrappedApp.name ?? 'App'
  })`;

  return AppWithTranslation;
};
