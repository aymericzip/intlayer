import { Website_Doc_Path } from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl, localeMap } from 'intlayer';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { loadFaqPage } from '~/serverFunctions/faq';

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
          to: getLocalizedUrl(faqsData[0].url, locale) as any,
        });
      }
      throw redirect({ to: getLocalizedUrl(Website_Doc_Path, locale) as any });
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
        { property: 'og:url', content: getLocalizedUrl(url, locale) },
        { property: 'og:title', content: `${title} | Intlayer` },
        { property: 'og:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: getLocalizedUrl(url, locale) },
        { rel: 'alternate', hrefLang: 'x-default', href: url },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),
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
