'use client';

import type { FC } from 'react';
import type { I18nextProvider as _I18nextProvider } from 'react-i18next';
import { IntlayerProvider } from 'react-intlayer';

const _I18nextProviderImpl: FC<any> = ({ i18n: _i18n, children }) => (
  <IntlayerProvider>{children}</IntlayerProvider>
);

/**
 * Drop-in for react-i18next's `I18nextProvider`.
 * The `i18n` prop is accepted for API compatibility but has no effect —
 * Intlayer uses its own instance.
 */
export const I18nextProvider =
  _I18nextProviderImpl as unknown as typeof _I18nextProvider;
