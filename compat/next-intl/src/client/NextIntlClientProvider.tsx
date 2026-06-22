'use client';

import { log, routing } from '@intlayer/config/built';
import { CYAN } from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getLocaleFromPath } from '@intlayer/core/localization';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { usePathname } from 'next/navigation';
import type { NextIntlClientProvider as _NextIntlClientProvider } from 'next-intl';
import { IntlayerClientProvider } from 'next-intlayer';
import type { ComponentProps } from 'react';

/**
 * Drop-in for next-intl's `NextIntlClientProvider`.
 * `messages`, `timeZone`, and `now` are accepted for API compatibility
 * but have no effect — Intlayer uses its own compiled dictionaries.
 */
export const NextIntlClientProvider: typeof _NextIntlClientProvider = ({
  locale,
  children,
  messages: _messages,
  timeZone: _timeZone,
  now: _now,
  ...rest
}) => {
  if (
    process.env.NODE_ENV === 'development' &&
    typeof _messages !== 'undefined'
  ) {
    const appLogger = getAppLogger({ log });
    appLogger(
      `${colorize('NextIntlClientProvider', CYAN)} do not pass the messages prop with intlayer. Messages are loaded automatically under the hood for bundle optimization reason`
    );
  }

  // next-intl drives the locale from the request: apps render
  // `<NextIntlClientProvider>` without a `locale` prop and the server resolves it
  // from the `[locale]` route segment. As a client component we cannot read the
  // server request here, so when no explicit `locale` is given we derive it from
  // the URL (the same `[locale]` segment) using Intlayer's routing config. This
  // keeps `useLocale`, `Link` and the locale switcher in sync with the URL
  // instead of falling back to the stored cookie / default locale.
  //
  // Only prefix-based routing carries the locale in the path. For `no-prefix` /
  // `search-params` the path has no locale segment, so we leave `locale`
  // undefined and let the provider resolve it from storage (cookie) — deriving
  // from the path there would wrongly clobber the cookie with the default locale.
  const pathname = usePathname();
  const mode = routing?.mode ?? 'prefix-no-default';
  const isPrefixMode = mode === 'prefix-all' || mode === 'prefix-no-default';
  const resolvedLocale =
    locale ?? (isPrefixMode ? getLocaleFromPath(pathname) : undefined);

  // `key={resolvedLocale}` remounts the provider when the locale changes via
  // navigation (next-intl switches locale by routing to a locale-prefixed path).
  // This re-seeds the client locale context so client components re-render in
  // the new language instead of keeping the previous one.
  return (
    <IntlayerClientProvider
      key={String(resolvedLocale)}
      locale={resolvedLocale}
      {...rest}
    >
      {children}
    </IntlayerClientProvider>
  );
};

/**
 *
 */
export type NextIntlClientProviderProps = Omit<
  ComponentProps<typeof _NextIntlClientProvider>,
  'messages'
> & {
  /**
   * @deprecated
   * has no use case with intlayer. Messages are loaded automatically under the hood for bundle optimization reason
   */
  messages?: never;
  /**
   * locale
   */
  locale: LocalesValues;
};
