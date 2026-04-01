import { Showcase_Submit_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { SubmitProjectForm } from '#/components/SubmitProjectForm/SubmitProjectForm';

export const Route = createFileRoute('/{-$locale}/submit')({
  component: SubmitProjectForm,
  head: ({ params }) => {
    const { locale } = params as { locale?: string };
    const path = Showcase_Submit_Path;
    const content = getIntlayer('showcase-submit', locale);
    const canonicalUrl = getLocalizedUrl(path, locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale }) => ({
          rel: 'alternate',
          hrefLang: locale,
          href: getLocalizedUrl(path, locale),
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
        { title: content.metadata.title },
        {
          name: 'description',
          content: content.metadata.description,
        },
        {
          name: 'keywords',
          content: content.metadata.keywords.join(', '),
        },
        { property: 'og:title', content: content.metadata.title },
        {
          property: 'og:description',
          content: content.metadata.description,
        },
        { property: 'og:url', content: canonicalUrl },
        { name: 'twitter:title', content: content.metadata.title },
        {
          name: 'twitter:description',
          content: content.metadata.description,
        },
      ],

      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: content.metadata.title,
            description: content.metadata.description,
            url: canonicalUrl,
          }),
        },
      ],
    };
  },
});
