import {
  External_Github,
  Website_Doc_Search,
  Website_Home,
  Website_TermsOfService,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer, locales } from 'intlayer';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { loadLegalContent } from '~/serverFunctions/legal';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toISOString().split('T')[0];

export const Route = createFileRoute('/{-$locale}/_docs/terms-of-service')({
  loader: async ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    return loadLegalContent({
      data: { locale, docKey: './legal/en/terms_of_service.md' },
    });
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { title, description, keywords, createdAt, updatedAt } = loaderData;
    const locale = params.locale ?? defaultLocale;
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
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: Website_Home,
            name: 'Intlayer',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${Website_Doc_Search}?search={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
            inLanguage: locales,
            keywords: websiteContent.keywords,
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Intlayer',
            url: Website_Home,
            logo: {
              '@type': 'ImageObject',
              url: `${Website_Home}/assets/logo.png`,
            },
            foundingDate: '2024',
            slogan: orgContent.slogan,
            knowsAbout: orgContent.knowsAbout,
            sameAs: [External_Github, 'https://twitter.com/intlayer'],
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'contact@intlayer.org',
              contactType: 'customer support',
              url: Website_Home,
              availableLanguage: locales,
            },
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            creator: { '@type': 'Person', name: 'Aymeric Pineau' },
            name: String(title),
            description: String(description),
            url: path,
            datePublished: createdAt ? formatDate(createdAt) : undefined,
            dateModified: updatedAt ? formatDate(updatedAt) : undefined,
            keywords: Array.isArray(keywords)
              ? keywords.join(', ')
              : String(keywords || ''),
            license:
              'https://raw.githubusercontent.com/aymericzip/intlayer/refs/heads/main/LICENSE',
            audience: {
              '@type': 'Audience',
              audienceType: creativeWorkContent.audienceType,
            },
          }),
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
