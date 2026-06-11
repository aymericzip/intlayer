import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { appWithTranslation as _appWithTranslation } from 'next-i18next/pages';
import type * as React from 'react';
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
export const appWithTranslation: typeof _appWithTranslation = (
  WrappedApp,
  _configOverride?
) => {
  const AppWithTranslation = (
    props: React.ComponentProps<typeof WrappedApp> & {
      pageProps: {
        _nextI18Next?: { initialLocale?: string };
        [key: string]: unknown;
      };
      router?: { locale?: string };
    }
  ) => {
    const locale: string | undefined =
      props.pageProps?._nextI18Next?.initialLocale ?? props.router?.locale;

    return (
      <IntlayerProvider locale={locale as LocalesValues}>
        <WrappedApp {...props} />
      </IntlayerProvider>
    );
  };

  AppWithTranslation.displayName = `appWithTranslation(${
    WrappedApp.displayName ?? WrappedApp.name ?? 'App'
  })`;

  return AppWithTranslation as unknown as ReturnType<
    typeof _appWithTranslation
  >;
};
