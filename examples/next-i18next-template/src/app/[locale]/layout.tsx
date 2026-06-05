import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { initI18next } from '@/app/i18n/server';
import {
  absoluteUrl,
  defaultLocale,
  isRtl,
  type Locale,
  locales,
  localizedPath,
} from '@/i18n.config';
import '@/app/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const i18n = await initI18next(locale, ['common'] as const);
  const resolvedLocale = i18n.language ?? defaultLocale;
  const tCommon = i18n.getFixedT(resolvedLocale, 'common');

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, '/')])
  );

  return {
    title: {
      default: tCommon('appTitle'),
      template: `%s | ${tCommon('appTitle')}`,
    },
    description: tCommon('appDescription'),
    alternates: {
      canonical: absoluteUrl(locale, '/'),
      languages: {
        ...languages,
        'x-default': absoluteUrl(defaultLocale, '/'),
      },
    },
  };
}

// Pre-generate static pages for all locales at build time (SSG)
// This improves performance and SEO
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const resolvedLocale = locale ?? defaultLocale;

  return (
    <html
      lang={resolvedLocale}
      dir={isRtl(resolvedLocale as Locale) ? 'rtl' : 'ltr'}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
