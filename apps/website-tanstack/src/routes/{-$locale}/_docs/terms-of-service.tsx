import {
  External_Github,
  Website_Doc_Search,
  Website_Home,
  Website_TermsOfService,
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

export const Route = createFileRoute('/{-$locale}/_docs/terms-of-service')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    return loadLegalContent({
      data: { locale, docKey: './legal/en/terms_of_service.md' },
    });
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { title, description, keywords, createdAt, updatedAt } = loaderData;
    const { locale = defaultLocale } = params;
    const path = Website_TermsOfService;

    const websiteContent = getIntlayer('website-structured-data', locale);
    const orgContent = getIntlayer('organization-structured-data', locale);
    const creativeWorkContent = getIntlayer(
      'creative-work-structured-data',
      locale
    );

    return {
      title: String(title),
      meta: [
        { name: 'description', content: String(description) },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : String(keywords || ''),
        },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: String(title) },
        { property: 'og:description', content: String(description) },
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
              slogan: String(orgContent.slogan),
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
              name: String(title),
              description: String(description),
              content: '',
              keywords: Array.isArray(keywords)
                ? keywords.join(', ')
                : String(keywords || ''),
              datePublished: createdAt ? new Date(createdAt) : undefined,
              dateModified: updatedAt ? new Date(updatedAt) : undefined,
              url: path,
              audienceType: String(creativeWorkContent.audienceType),
            })
          ),
        },
      ],
    };
  },
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  const { fileParsed } = Route.useLoaderData();

  return (
    <div className="m-auto max-w-2xl">
      <DocumentationRender>{fileParsed}</DocumentationRender>
    </div>
  );
}
