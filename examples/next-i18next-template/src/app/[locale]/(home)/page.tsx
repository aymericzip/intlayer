import type { ResourceLanguage } from 'i18next';
import Image from 'next/image';
import { initI18next } from '@/app/i18n/server';
import I18nProvider from '@/components/I18nProvider';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import LocalizedLink from '@/components/LocalizedLink';
import type { Locale } from '@/i18n.config';
import type { Namespace } from '@/i18n.namespaces';

/**
 * Home page - server component that handles i18n initialization
 * Pre-loads translations on the server and passes them to client components
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // Define which translation namespaces this page needs
  const namespaces = ['common', 'home'] as const satisfies readonly Namespace[];

  // Initialize i18next on the server with required namespaces
  const i18n = await initI18next(locale, namespaces);

  // Resolve the actual language from the initialized instance (handles undefined params)
  const resolvedLocale = i18n.language as Locale;

  // Get a fixed translation function for the "common" namespace
  const tHome = i18n.getFixedT(resolvedLocale, 'home');

  // Extract translation bundles from the i18n instance
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
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
            <LocaleSwitcher />
          </div>
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs font-semibold text-3xl text-black leading-10 tracking-tight dark:text-zinc-50">
              {tHome('welcome')}
            </h1>
            <p className="max-w-md text-lg text-zinc-600 leading-8 dark:text-zinc-400">
              {tHome('greeting')}
            </p>
          </div>
          <div className="flex flex-col gap-4 font-medium text-base sm:flex-row">
            <LocalizedLink
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] md:w-[158px] dark:hover:bg-[#ccc]"
              href="/about"
            >
              {tHome('aboutPage')}
            </LocalizedLink>
            <a
              className="flex h-12 w-full items-center justify-center rounded-full border border-black/[.08] border-solid px-5 transition-colors hover:border-transparent hover:bg-black/[.04] md:w-[158px] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              {tHome('documentation')}
            </a>
          </div>
        </main>
      </div>
    </I18nProvider>
  );
}
