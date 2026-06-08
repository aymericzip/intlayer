import { App_Home_Path } from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { loadFaqPage } from '~/serverFunctions/faq';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/_docs/frequent-questions/$')({
  loader: async ({ params }) => {
    const locale = (params.locale as string) ?? defaultLocale;
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
    const { title, description, keywords, url } = frequentQuestionData;

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
