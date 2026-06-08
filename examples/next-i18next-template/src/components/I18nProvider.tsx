'use client';

import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { ReactNode } from 'react';
import { IntlayerProvider } from 'react-intlayer';

type Props = {
  locale: string;
  children: ReactNode;
  /** Kept for API compatibility — no longer used. Resources are compiled at build time. */
  namespaces?: readonly string[];
  resources?: Record<string, unknown>;
};

/**
 * Client-side provider that gives all child components access to the current
 * locale and to translations via `useTranslation`.
 */
export default function I18nProvider({ locale, children }: Props) {
  return (
    <IntlayerProvider locale={locale as LocalesValues}>
      {children}
    </IntlayerProvider>
  );
}
