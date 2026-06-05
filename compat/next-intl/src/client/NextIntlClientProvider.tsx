'use client';

import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { NextIntlClientProvider as _NextIntlClientProvider } from 'next-intl';
import { IntlayerClientProvider } from 'next-intlayer';
import type * as React from 'react';
import type { FC } from 'react';

const _NextIntlClientProviderImpl: FC<any> = ({
  locale,
  children,
  messages: _messages,
  timeZone: _timeZone,
  now: _now,
  ...rest
}) => (
  <IntlayerClientProvider locale={locale as LocalesValues} {...rest}>
    {children}
  </IntlayerClientProvider>
);

/**
 * Drop-in for next-intl's `NextIntlClientProvider`.
 * `messages`, `timeZone`, and `now` are accepted for API compatibility
 * but have no effect — Intlayer uses its own compiled dictionaries.
 */
export const NextIntlClientProvider =
  _NextIntlClientProviderImpl as unknown as typeof _NextIntlClientProvider;

export type NextIntlClientProviderProps = React.ComponentProps<
  typeof _NextIntlClientProvider
>;
