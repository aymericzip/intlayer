import pick from 'lodash/pick';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { defaultLocale, type Locale, locales, localizedPath } from '@/i18n';

// generateMetadata runs for each locale, generating SEO-friendly metadata
// This helps search engines understand alternate language versions
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('about');

  const url = '/about';
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, 'x-default': url },
    },
  };
}

export default async function AboutLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // Messages are loaded server-side. Push only what's needed to the client.
  // This minimizes the JavaScript bundle sent to the browser
  const messages = await getMessages();
  const clientMessages = pick(messages, ['common', 'about']);

  // NextIntlClientProvider makes translations available to client components
  // Only pass the namespaces your client components actually use
  return (
    <NextIntlClientProvider
      locale={locale ?? defaultLocale}
      messages={clientMessages}
    >
      {children}
    </NextIntlClientProvider>
  );
}
