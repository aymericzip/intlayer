'use client';

import { log } from '@intlayer/config/built';
import { CYAN } from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { ComponentProps } from 'react';
import { IntlayerProvider } from 'react-intlayer';
import type { IntlProvider as _IntlProvider } from 'use-intl';

/**
 * Drop-in for use-intl's `IntlProvider`.
 *
 * Wraps Intlayer's `IntlayerProvider`, seeding the client locale from the
 * `locale` prop. `messages`, `formats`, `now`, `timeZone`, `onError`, and
 * `getMessageFallback` are accepted for API compatibility but have no effect —
 * Intlayer uses its own compiled dictionaries.
 */
export const IntlProvider: typeof _IntlProvider = ({
  locale,
  children,
  messages: _messages,
  formats: _formats,
  now: _now,
  timeZone: _timeZone,
  onError: _onError,
  getMessageFallback: _getMessageFallback,
}) => {
  if (
    process.env.NODE_ENV === 'development' &&
    typeof _messages !== 'undefined'
  ) {
    const appLogger = getAppLogger({ log });
    appLogger(
      `${colorize('IntlProvider', CYAN)} do not pass the messages prop with intlayer. Messages are loaded automatically under the hood for bundle optimization reason`
    );
  }

  // `key={locale}` re-seeds the client locale context when the locale changes,
  // so consumers re-render in the new language.
  return (
    <IntlayerProvider key={String(locale)} locale={locale as LocalesValues}>
      {children}
    </IntlayerProvider>
  );
};

/**
 * Props accepted by {@link IntlProvider}. `messages` is deprecated — Intlayer
 * loads content from compiled dictionaries automatically.
 */
export type IntlProviderProps = Omit<
  ComponentProps<typeof _IntlProvider>,
  'messages' | 'locale'
> & {
  /**
   * @deprecated has no use case with intlayer. Messages are loaded
   * automatically under the hood for bundle optimization reason.
   */
  messages?: never;
  /** The active locale. */
  locale: LocalesValues;
};
