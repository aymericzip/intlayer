'use client';

import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { I18nContext } from '@lingui/react';
import { useContext, useMemo } from 'react';
import { useLocale } from 'react-intlayer';
import { I18nClass } from './I18nClass';
import { LinguiContext } from './LinguiContext';

/**
 * Drop-in for `@lingui/react`'s `useLingui`.
 *
 * Returns `{ i18n, _, defaultComponent }` from the nearest `I18nProvider`.
 * When used outside a provider, derives a locale-aware `i18n` instance from
 * `react-intlayer`'s `useLocale()` so that Server Components and test contexts
 * work without an explicit provider.
 *
 * @example
 * ```tsx
 * const { _ } = useLingui();
 * return <h1>{_({ id: 'home.title', message: 'Welcome' })}</h1>;
 * ```
 */
export const useLingui = (): I18nContext => {
  const context = useContext(LinguiContext);
  const { locale } = useLocale();

  const derivedI18n = useMemo(() => {
    const instance = new I18nClass({ locale: locale as string });
    return {
      i18n: instance as unknown as I18nContext['i18n'],
      _: instance._.bind(instance) as I18nContext['_'],
    };
  }, [locale]);

  if (context) {
    return context;
  }

  return derivedI18n as I18nContext;
};
