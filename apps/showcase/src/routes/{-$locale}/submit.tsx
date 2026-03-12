import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { PagesRoutes } from '#/Routes';
import { SubmitProjectForm } from '@/components/SubmitProjectForm/SubmitProjectForm';

export const Route = createFileRoute('/{-$locale}/submit')({
  component: SubmitProjectForm,
  head: ({ params }) => {
    const { locale } = params as { locale?: string };
    const path = PagesRoutes.ShowcaseSubmit;
    const content = getIntlayer('app', locale);
    const canonicalUrl = getLocalizedUrl(path, locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: content.submitPage.metadata.title },
        {
          name: 'description',
          content: content.submitPage.metadata.description,
        },
        {
          name: 'keywords',
          content: content.metadata.keywords.join(', '),
        },
        { property: 'og:title', content: content.submitPage.metadata.title },
        {
          property: 'og:description',
          content: content.submitPage.metadata.description,
        },
        { property: 'og:url', content: canonicalUrl },
        { name: 'twitter:title', content: content.submitPage.metadata.title },
        {
          name: 'twitter:description',
          content: content.submitPage.metadata.description,
        },
      ],

      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: content.submitPage.metadata.title,
            description: content.submitPage.metadata.description,
            url: canonicalUrl,
          }),
        },
      ],
    };
  },
});
