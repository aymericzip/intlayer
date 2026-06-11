'use client';

import { log } from '@intlayer/config/built';
import { CYAN } from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
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

  // `key={locale}` remounts the provider when the locale changes via navigation
  // (next-intl switches locale by routing to a locale-prefixed path). This
  // re-seeds the client locale context from the new `locale` prop so client
  // components re-render in the new language instead of keeping the previous one.
  return (
    <IntlayerClientProvider key={String(locale)} locale={locale} {...rest}>
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
