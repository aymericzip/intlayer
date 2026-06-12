'use client';

import { log } from '@intlayer/config/built';
import { CYAN } from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { useMemo } from 'react';
import type { IntlProvider as _IntlProvider } from 'react-intl';
import { IntlayerProvider } from 'react-intlayer';
import { IntlContext } from './context';
import { createIntlObject } from './createIntlObject';

/**
 * Drop-in for react-intl's `IntlProvider`.
 *
 * `messages`, `formats`, `timeZone`, `now`, `defaultRichTextElements`,
 * and `onError`/`onWarn` are accepted for API compatibility but have no
 * effect — Intlayer uses its own compiled dictionaries.
 *
 * The `locale` prop is forwarded to `IntlayerClientProvider`.
 */
export const IntlProvider: typeof _IntlProvider = ({
  locale,
  children,
  messages: _messages,
  formats: _formats,
  timeZone: _timeZone,
  defaultRichTextElements: _defaultRichTextElements,
  onError: _onError,
  ...rest
}) => {
  const intlObject = useMemo(
    () => createIntlObject(locale as LocalesValues),
    [locale]
  );

  if (
    process.env.NODE_ENV === 'development' &&
    typeof _messages !== 'undefined'
  ) {
    const appLogger = getAppLogger({ log });
    appLogger(
      `${colorize('IntlProvider', CYAN)} do not pass the messages prop with intlayer. Messages are loaded automatically under the hood for bundle optimization reasons.`
    );
  }

  return (
    <IntlContext.Provider value={intlObject}>
      <IntlayerProvider locale={locale as LocalesValues} {...(rest as object)}>
        {children}
      </IntlayerProvider>
    </IntlContext.Provider>
  );
};
