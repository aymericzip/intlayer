import type { Metadata } from 'next';

import type { ReactNode } from 'react';

import {
  absoluteUrl,
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from '@/i18n.config';

/**
 * Generate SEO metadata for each locale version of the page
 * This function runs for each locale at build time
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const resolvedLocale = locale ?? defaultLocale;

  // Dynamically import translation file for this locale
  // Used to get translated title and description for metadata
  const messages = (await import(`@/locales/${resolvedLocale}/about.json`))
    .default;

  // Create hreflang mapping for all locales
  // Helps search engines understand language alternatives
  // Format: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, '/about')])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // Canonical URL for this locale version
      canonical: absoluteUrl(resolvedLocale, '/about'),
      // Language alternatives for SEO (hreflang tags)
      // "x-default" specifies the default locale version
      languages: {
        ...languages,
        'x-default': absoluteUrl(defaultLocale, '/about'),
      },
    },
  };
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
