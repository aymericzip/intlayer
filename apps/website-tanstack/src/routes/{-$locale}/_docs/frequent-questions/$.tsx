import {
  App_Home_Path,
  External_Github,
  Website_Doc_Search,
  Website_Home,
} from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getIntlayer, locales } from 'intlayer';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { loadFaqPage } from '~/serverFunctions/faq';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toISOString().split('T')[0]!;

export const Route = createFileRoute('/{-$locale}/_docs/frequent-questions/$')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const slugsStr = (params as any)['*'] || '';
    const slugs = slugsStr ? slugsStr.split('/') : [];

    const result = await loadFaqPage({ data: { locale, slugs } });
    const { exactMatch, faqsData, content } = result;

    if (!exactMatch) {
      if (faqsData.length > 0) {
        throw redirect({
          to: `/{-$locale}${faqsData[0].relativeUrl}`,
          params: {
            locale,
          },
        });
      }
      throw redirect({
        to: `/{-$locale}${App_Home_Path}`,
        params: {
          locale,
        },
      });
    }

    return {
      blogContent: content!.blogContent,
      blogParsed: content!.blogParsed,
      frequentQuestionData: exactMatch,
      locale,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.frequentQuestionData) return {};
    const { frequentQuestionData, locale } = loaderData;
    const {
      title,
      description,
      keywords,
      url,
      createdAt,
      updatedAt,
      author,
      history,
    } = frequentQuestionData;

    const websiteContent = getIntlayer('website-structured-data', locale);
    const orgContent = getIntlayer('organization-structured-data', locale);
    const creativeWorkContent = getIntlayer(
      'creative-work-structured-data',
      locale
    );

    return {
      title: `${title} | Intlayer`,
      meta: [
        { name: 'description', content: description },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : keywords || '',
        },
        { property: 'og:url', content: getAbsoluteUrl(url, locale) },
        { property: 'og:title', content: `${title} | Intlayer` },
        { property: 'og:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(url, locale) },
        {
          rel: 'alternate',
          type: 'text/markdown',
          href: `${getAbsoluteUrl(url, locale)}.md`,
        },
        ...getHreflangLinks(url),
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
            subjectOf: {
              '@type': 'DataFeed',
              name: 'Intlayer RSS Feed',
              url: `${Website_Home}/feed.xml`,
              encodingFormat: 'application/rss+xml',
            },
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
            '@type': 'TechArticle',
            author: {
              '@type': 'Person',
              name: author?.name ?? 'Aymeric Pineau',
              url: author?.github
                ? `https://github.com/${author.github}`
                : undefined,
            },
            creator: {
              '@type': 'Person',
              name: author?.name ?? 'Aymeric Pineau',
              url: author?.github
                ? `https://github.com/${author.github}`
                : undefined,
            },
            name: title,
            description,
            url,
            datePublished: createdAt ? formatDate(createdAt) : undefined,
            dateModified: updatedAt ? formatDate(updatedAt) : undefined,
            version: history?.[0]?.version,
            keywords: Array.isArray(keywords)
              ? keywords.join(', ')
              : keywords || '',
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
  component: FrequentQuestionPage,
});

function FrequentQuestionPage() {
  const { blogParsed } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-2xl">
      <DocumentationRender>{blogParsed}</DocumentationRender>
    </div>
  );
}
