import {
  App_Home_Path,
  External_Github,
  Website_Doc_Search,
  Website_Home,
} from '@intlayer/design-system/routes';
import {
  buildCreativeWorkJsonLd,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from '@intlayer/design-system/structured-data';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getIntlayer, locales } from 'intlayer';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { loadFaqPage } from '~/serverFunctions/faq';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

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
  const { blogParsed } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-2xl">
      <DocumentationRender>{blogParsed}</DocumentationRender>
    </div>
  );
}
