'use client';

import type { ResourceLanguage } from 'i18next';
import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { defaultLocale } from '@/i18n.config';
import type { Namespace } from '@/i18n.namespaces';

// Configure dynamic resource loading for client-side
// Same pattern as server-side, but this instance runs in the browser
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // Pre-loaded resources from server (prevents FOUC - Flash of Untranslated Content)
  // Format: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * Client-side i18n provider that wraps the app with i18next context
 * Receives pre-loaded resources from server to avoid re-fetching translations
 */
export default function I18nProvider({
  locale,
  namespaces = ['common'] as const,
  resources,
  children,
}: Props) {
  // Create i18n instance once using useState lazy initializer
  // This ensures the instance is created only once, not on every render
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();
    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // If resources are provided (from server), use them to avoid client-side fetching
        // This prevents FOUC and improves initial load performance
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: 'common',
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // Prevent undefined values from being returned
      });
    return i18nInstance;
  });

  // Update language when locale prop changes
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Ensure all required namespaces are loaded client-side
  // Using join("|") as dependency to compare arrays correctly
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [i18n, namespaces]);

  // Provide i18n instance to all child components via React context
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
