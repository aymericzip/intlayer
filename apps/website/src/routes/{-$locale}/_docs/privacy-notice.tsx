import {
  External_Github,
  Website_Doc_Search,
  Website_Home,
  Website_PrivacyPolicy,
} from '@intlayer/design-system/routes';
import {
  buildCreativeWorkJsonLd,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer, locales } from 'intlayer';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { loadLegalContent } from '~/serverFunctions/legal';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toISO().split('T')[0];

export const Route = createFileRoute('/{-$locale}/_docs/privacy-notice')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    return loadLegalContent({
      data: { locale, docKey: './legal/en/privacy_notice.md' },
    });
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { title, description, keywords, createdAt, updatedAt } = loaderData;
    const { locale = defaultLocale } = params;
    const path = Website_PrivacyPolicy;

    const websiteContent = getIntlayer('website-structured-data', locale);
    const orgContent = getIntlayer('organization-structured-data', locale);
    const creativeWorkContent = getIntlayer(
      'creative-work-structured-data',
      locale
    );

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : keywords || '',
        },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildWebsiteJsonLd({
              url: Website_Home,
              searchUrl: Website_Doc_Search,
              locales: locales as string[],
              keywords: websiteContent.keywords as string[],
              rssUrl: `${Website_Home}/feed.xml`,
            })
          ),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildOrganizationJsonLd({
              url: Website_Home,
              logoUrl: `${Website_Home}/assets/logo.png`,
              slogan: orgContent.slogan,
              knowsAbout: orgContent.knowsAbout as string[],
              sameAs: [External_Github, 'https://twitter.com/intlayer'],
              availableLanguages: locales as string[],
            })
          ),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildCreativeWorkJsonLd({
              type: 'WebPage',
              name: title,
              description: description,
              content: '',
              keywords: Array.isArray(keywords)
                ? keywords.join(', ')
                : keywords || '',
              datePublished: createdAt ? new Date(createdAt) : undefined,
              dateModified: updatedAt ? new Date(updatedAt) : undefined,
              url: path,
              audienceType: creativeWorkContent.audienceType,
            })
          ),
        },
      ],
    };
  },
  component: PrivacyNoticePage,
});

function PrivacyNoticePage() {
  const { fileParsed } = Route.useLoaderData();

  return (
    <div className="m-auto max-w-2xl">
      <DocumentationRender>{fileParsed}</DocumentationRender>
    </div>
  );
}
