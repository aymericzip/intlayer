'use client';

import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { useContext, useMemo } from 'react';
import type { useIntl as _useIntl } from 'react-intl';
import { useLocale } from 'react-intlayer';
import { IntlContext } from './context';
import { createIntlObject } from './createIntlObject';

/**
 * Drop-in for react-intl's `useIntl`.
 *
 * Returns the active `IntlShape` instance. When used inside an
 * {@link IntlProvider} the instance comes from context; otherwise it is
 * derived from `react-intlayer`'s locale context on the fly.
 *
 * @example
 * ```tsx
 * const intl = useIntl();
 * intl.formatMessage({ id: 'home.title' });
 * intl.formatNumber(42, { style: 'currency', currency: 'USD' });
 * ```
 */
export const useIntl: typeof _useIntl = () => {
  const contextIntl = useContext(IntlContext);
  const { locale } = useLocale();

  const derivedIntl = useMemo(
    () => createIntlObject(locale as LocalesValues),
    [locale]
  );

  return contextIntl ?? derivedIntl;
};
