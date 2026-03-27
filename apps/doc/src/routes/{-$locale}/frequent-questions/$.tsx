import {
  type FrequentQuestionKey,
  getFrequentQuestion,
  getFrequentQuestionMetadataBySlug,
} from '@intlayer/docs';
import { createFileRoute, redirect } from '@tanstack/react-router';
import {
  defaultLocale,
  getLocalizedUrl,
  getMultilingualUrls,
  Locales,
} from 'intlayer';
import { DocumentationRender } from '#/components/DocPage/DocumentationRender';
import { PagesRoutes } from '#/Routes';
import { urlRenamer } from '#/utils/markdown';

export const Route = createFileRoute('/{-$locale}/frequent-questions/$')({
  loader: async ({ params }) => {
    const locale = ((params as { locale?: string }).locale ??
      defaultLocale) as string;
    const splat = (params as { _splat: string })._splat ?? '';
    const slugs = splat ? splat.split('/').filter(Boolean) : [];

    const questionsData = await getFrequentQuestionMetadataBySlug(
      slugs,
      locale as any
    );
    const filteredData = questionsData.filter(
      (q) => q.slugs.length === slugs.length + 1
    );

    if (!filteredData || filteredData.length === 0) {
      throw redirect({ to: PagesRoutes.FrequentQuestions });
    }

    const questionData = filteredData[0];
    const file = await getFrequentQuestion(
      questionData.docKey as FrequentQuestionKey,
      locale as any
    );
    const content = urlRenamer(file, locale as any);

    return { questionData, content, locale };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { questionData, locale } = loaderData;
    const relativeUrl = questionData.relativeUrl;

    return {
      meta: [
        { title: `${questionData.title} | Intlayer` },
        { name: 'description', content: questionData.description },
        { name: 'keywords', content: questionData.keywords.join(', ') },
        { property: 'og:title', content: `${questionData.title} | Intlayer` },
        { property: 'og:description', content: questionData.description },
      ],
      links: [
        {
          rel: 'canonical',
          href: getLocalizedUrl(relativeUrl, Locales.ENGLISH),
        },
        ...Object.entries(getMultilingualUrls(relativeUrl)).map(
          ([lang, url]) => ({
            rel: 'alternate',
            hrefLang: lang,
            href: url as string,
          })
        ),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(relativeUrl, Locales.ENGLISH),
        },
      ],
    };
  },
  component: FrequentQuestionPage,
});

function FrequentQuestionPage() {
  const { content } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <DocumentationRender>{content}</DocumentationRender>
    </div>
  );
}
