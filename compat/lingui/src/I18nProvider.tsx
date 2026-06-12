'use client';

import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { I18n } from '@lingui/core';
import type { I18nProviderProps } from '@lingui/react';
import { type JSX, useEffect, useState } from 'react';
import { IntlayerProvider } from 'react-intlayer';
import { LinguiContext } from './LinguiContext';

/**
 * Drop-in for `@lingui/react`'s `I18nProvider`.
 *
 * Differences from the original:
 * - Wraps children in an `IntlayerProvider` so that intlayer hooks receive the
 *   correct locale from the `i18n` instance.
 * - Listens to the `i18n` `'change'` event to sync locale and context when
 *   `i18n.activate(locale)` is called at runtime.
 * - The `defaultComponent` prop is forwarded but not used for rendering — it is
 *   stored in context for downstream `useLingui()` consumers.
 *
 * @example
 * ```tsx
 * import { i18n } from '@lingui/core';
 * import { I18nProvider } from '@lingui/react';
 *
 * i18n.activate('fr');
 *
 * export default function App() {
 *   return (
 *     <I18nProvider i18n={i18n}>
 *       <YourApp />
 *     </I18nProvider>
 *   );
 * }
 * ```
 */
export const I18nProvider = ({
  i18n,
  defaultComponent,
  children,
}: I18nProviderProps): JSX.Element | null => {
  const buildContext = (instance: I18n) => ({
    i18n: instance,
    _: instance._.bind(instance),
    defaultComponent,
  });

  const [linguiContext, setLinguiContext] = useState(() => buildContext(i18n));
  const [locale, setLocale] = useState<string>(i18n.locale);

  useEffect(() => {
    setLinguiContext(buildContext(i18n));
    setLocale(i18n.locale);

    return i18n.on('change', () => {
      setLinguiContext(buildContext(i18n));
      setLocale(i18n.locale);
    });
    // defaultComponent intentionally excluded — changes to it require remounting anyway
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n]);

  return (
    <LinguiContext.Provider value={linguiContext}>
      <IntlayerProvider locale={locale as LocalesValues}>
        {children}
      </IntlayerProvider>
    </LinguiContext.Provider>
  );
};
