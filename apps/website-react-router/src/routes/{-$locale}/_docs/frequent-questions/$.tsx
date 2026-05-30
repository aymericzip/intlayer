import { Website_Doc_Path } from '@intlayer/design-system/routes';
import {
  type FrequentQuestionKey,
  getFrequentQuestion,
  getFrequentQuestionMetadataBySlug,
} from '@intlayer/docs';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl, localeMap } from 'intlayer';
import { parseMarkdown } from 'react-intlayer/markdown';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { urlRenamer } from '~/utils/markdown';

export const Route = createFileRoute('/{-$locale}/_docs/frequent-questions/$')({
  loader: async ({ params }) => {
    const locale = (params.locale as string) ?? defaultLocale;
    const slugsStr = (params as any)['*'] || '';
    const slugs = slugsStr ? slugsStr.split('/') : [];

    const frequentQuestionsData = await getFrequentQuestionMetadataBySlug(
      slugs,
      locale
    );
    const exactMatch = frequentQuestionsData.find(
      (faq) => faq.slugs.join('/') === slugs.join('/')
    );

    if (!exactMatch) {
      if (frequentQuestionsData.length > 0) {
        throw redirect({
          to: getLocalizedUrl(frequentQuestionsData[0].url, locale) as any,
        });
      }
      throw redirect({ to: getLocalizedUrl(Website_Doc_Path, locale) as any });
    }

    const frequentQuestionData = exactMatch;
    const file = await getFrequentQuestion(
      frequentQuestionData?.docKey as FrequentQuestionKey,
      locale
    );
    const blogContent = urlRenamer(file, locale);
    const blogParsed = parseMarkdown(blogContent);

    return { blogContent, blogParsed, frequentQuestionData, locale };
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
