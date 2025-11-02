import type { ResourceLanguage } from 'i18next';

import { initI18next } from '@/app/i18n/server';

import ClientComponent from '@/components/ClientComponent';

import I18nProvider from '@/components/I18nProvider';

import LocaleSwitcher from '@/components/LocaleSwitcher';

import LocalizedLink from '@/components/LocalizedLink';

import ServerComponent from '@/components/ServerComponent';

import type { Locale } from '@/i18n.config';

import { defaultLocale } from '@/i18n.config';

import type { Namespace } from '@/i18n.namespaces';

/**
 * Server component page that handles i18n initialization
 * Pre-loads translations on the server and passes them to client components
 */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  // Define which translation namespaces this page needs
  // Using 'as const' for type safety and better autocomplete
  const namespaces = [
    'common',
    'about',
  ] as const satisfies readonly Namespace[];

  const { locale } = await params;

  // Initialize i18next on the server with required namespaces
  // This loads translation JSON files server-side
  const i18n = await initI18next(locale, namespaces);

  // Resolve the actual language from the initialized instance (handles undefined params)
  const resolvedLocale = i18n.language ?? (defaultLocale as Locale);

  // Get a fixed translation function for the "about" namespace
  // getFixedT locks the namespace, so t("title") instead of t("about:title")
  const tAbout = i18n.getFixedT(resolvedLocale, 'about');

  // Extract translation bundles from the i18n instance
  // This data is passed to I18nProvider to hydrate client-side i18n
  // Prevents FOUC (Flash of Untranslated Content) and avoids duplicate fetching
  const resources = Object.fromEntries(
    namespaces.map((ns) => [
      ns,
      i18n.getResourceBundle(resolvedLocale, ns) as ResourceLanguage,
    ])
  ) as Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={resolvedLocale}
      namespaces={namespaces}
      resources={resources}
    >
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
          <div className="flex w-full items-start justify-between">
            <LocalizedLink
              href="/"
              className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              ← Back to Home
            </LocalizedLink>
            <LocaleSwitcher />
          </div>

          <div className="flex w-full flex-col items-center gap-8 text-center sm:items-start sm:text-left">
            <h1 className="font-bold text-4xl text-black dark:text-zinc-50">
              {tAbout('title')}
            </h1>

            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {tAbout('description')}
            </p>

            <div className="mt-8 w-full border-zinc-200 border-t pt-8 dark:border-zinc-800">
              <h2 className="mb-6 font-semibold text-2xl text-black dark:text-zinc-50">
                Client Component Example
              </h2>
              <ClientComponent />
            </div>

            <div className="mt-8 w-full border-zinc-200 border-t pt-8 dark:border-zinc-800">
              <h2 className="mb-6 font-semibold text-2xl text-black dark:text-zinc-50">
                Server Component Example
              </h2>
              <ServerComponent t={tAbout} locale={resolvedLocale} count={0} />
            </div>
          </div>

          <div className="w-full pt-8" />
        </main>
      </div>
    </I18nProvider>
  );
}
