import { buildCreativeWorkJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getPrefix } from 'intlayer';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { loadFaqPage } from '~/serverFunctions/faq';
import { getCanonicalSlugs } from '~/utils/canonicalSlugs';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import {
  getCreativeWorkStructuredData,
  getSiteStructuredData,
  getSiteStructuredDataScripts,
} from '~/utils/structuredData';

export const Route = createFileRoute('/{-$locale}/_docs/frequent-questions/$')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const slugsStr = (params as any)['*'] || '';
    const slugs = getCanonicalSlugs('frequent-questions', slugsStr, locale);

    const [result, siteStructuredData, creativeWorkContent] = await Promise.all(
      [
        loadFaqPage({ data: { locale, slugs } }),
        getSiteStructuredData({ data: locale }),
        getCreativeWorkStructuredData({ data: locale }),
      ]
    );

    const { exactMatch, faqsData, content } = result;

    if (!exactMatch) {
      if (faqsData.length > 0) {
        throw redirect({
          to: `/{-$locale}${faqsData[0].relativeUrl}`,
          params: {
            locale: getPrefix(locale).localePrefix,
          },
        });
      }
      throw redirect({
        to: `/{-$locale}`,
        params: {
          locale: getPrefix(locale).localePrefix,
        },
      });
    }

    return {
      siteStructuredData,
      creativeWorkContent,
      blogParsed: content!.blogParsed,
      codeStyleSheet: content!.codeStyleSheet,
      frequentQuestionData: exactMatch,
      locale,
    };
  },
  staleTime: Infinity,
  head: ({ loaderData }) => {
    if (!loaderData?.frequentQuestionData) return {};
    const {
      frequentQuestionData,
      locale,
      siteStructuredData,
      creativeWorkContent,
    } = loaderData;
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

    return {
      meta: [
        { title: `${title} | Intlayer` },
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
        ...getSiteStructuredDataScripts(siteStructuredData),
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildCreativeWorkJsonLd({
              type: 'TechArticle',
              name: title,
              description,
              content: '',
              keywords: Array.isArray(keywords)
                ? keywords.join(', ')
                : keywords || '',
              datePublished: createdAt ? new Date(createdAt) : undefined,
              dateModified: updatedAt ? new Date(updatedAt) : undefined,
              url,
              author: author
                ? {
                    '@type': 'Person',
                    name: author.name,
                    url: author.url,
                    jobTitle: author.title,
                    image: author.image,
                    sameAs: author.socialMedias,
                    knowsAbout: author.knowsAbout,
                  }
                : undefined,
              version: history?.[0]?.version,
              audienceType: String(creativeWorkContent.audienceType),
            })
          ),
        },
      ],
    };
  },
  component: FrequentQuestionPage,
});

function FrequentQuestionPage() {
  const { blogParsed, codeStyleSheet } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-2xl">
      <DocumentationRender codeStyleSheet={codeStyleSheet}>
        {blogParsed}
      </DocumentationRender>
    </div>
  );
}
