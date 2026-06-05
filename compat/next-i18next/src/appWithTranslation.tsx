import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { appWithTranslation as _appWithTranslation } from 'next-i18next';
import type { ComponentType } from 'react';
import { IntlayerProvider } from 'react-intlayer';

interface PagePropsWithI18n {
  _nextI18Next?: {
    initialLocale?: string;
  };
  [key: string]: unknown;
}

interface AppPropsWithRouter {
  pageProps: PagePropsWithI18n;
  router?: {
    locale?: string;
  };
  [key: string]: unknown;
}

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
const _appWithTranslationImpl = <P extends { pageProps: PagePropsWithI18n }>(
  WrappedApp: ComponentType<P>,
  _configOverride?: Record<string, unknown>
): ComponentType<P> => {
  const AppWithTranslation = (props: P & AppPropsWithRouter) => {
    const locale: string | undefined =
      props.pageProps?._nextI18Next?.initialLocale ?? props.router?.locale;

    return (
      <IntlayerProvider locale={locale as LocalesValues}>
        <WrappedApp {...(props as P)} />
      </IntlayerProvider>
    );
  };

  AppWithTranslation.displayName = `appWithTranslation(${
    WrappedApp.displayName ?? WrappedApp.name ?? 'App'
  })`;

  return AppWithTranslation as unknown as ComponentType<P>;
};

export const appWithTranslation =
  _appWithTranslationImpl as unknown as typeof _appWithTranslation;
