import { Showcase_Submit_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer, type Locale } from 'intlayer';
import { SubmitProjectForm } from '#/components/SubmitProjectForm/SubmitProjectForm';
import { getAbsoluteUrl, getHreflangLinks } from '#/utils/seo';

export const Route = createFileRoute('/{-$locale}/submit')({
  component: SubmitProjectForm,
  head: ({ params }) => {
    const { locale } = params as { locale?: Locale };
    const path = Showcase_Submit_Path;
    const content = getIntlayer('showcase-submit', locale);
    const canonicalUrl = getAbsoluteUrl(path, locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: 'canonical', href: canonicalUrl },

        // Hreflang: absolute alternates for every locale, plus x-default
        ...getHreflangLinks(path),
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
