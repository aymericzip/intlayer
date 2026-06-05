import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { defaultLocale } from '@/i18n.config';
import type { Namespace } from '@/i18n.namespaces';
import { namespaces } from '@/i18n.namespaces';

// Configure dynamic resource loading for i18next
// This function dynamically imports translation JSON files based on locale and namespace
// Example: locale="fr", namespace="about" -> imports "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

/**
 * Initialize i18next instance for server-side rendering
 *
 * @returns Initialized i18next instance ready for server-side use
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = [namespaces[0]] as const
) {
  // Create a new i18next instance (separate from client-side instance)
  const i18n = createInstance();

  // Initialize with React integration and backend loader
  await i18n
    .use(initReactI18next) // Enable React hooks support
    .use(backend) // Enable dynamic resource loading
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // Load only specified namespaces for better performance
      defaultNS: 'common', // Default namespace when none is specified
      interpolation: { escapeValue: false }, // Don't escape HTML (React handles XSS protection)
      react: { useSuspense: false }, // Disable Suspense for SSR compatibility
      returnNull: false, // Return empty string instead of null for missing keys
      initImmediate: false, // Defer initialization until resources are loaded (faster SSR)
    });

  return i18n;
}
