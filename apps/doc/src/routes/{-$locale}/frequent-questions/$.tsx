import { Website_FrequentQuestions } from '@intlayer/design-system/routes';
import type { FrequentQuestionKey } from '@intlayer/docs';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl, localeMap } from 'intlayer';
import { DocumentationRender } from '#/components/DocPage/DocumentationRender';
import { urlRenamer } from '#/utils/markdown';

export const Route = createFileRoute('/{-$locale}/frequent-questions/$')({
  loader: async ({ params }) => {
    const { getFrequentQuestion, getFrequentQuestionMetadataBySlug } =
      await import('@intlayer/docs');
    const locale = ((params as { locale?: string }).locale ??
      defaultLocale) as string;
    const splat = (params as { _splat: string })._splat ?? '';
    const slugs = splat ? splat.split('/').filter(Boolean) : [];

    const questionsData = await getFrequentQuestionMetadataBySlug(
      slugs,
      locale
    );
    const filteredData = questionsData.filter(
      (q) => q.slugs.length === slugs.length + 1
    );

    if (!filteredData || filteredData.length === 0) {
      throw redirect({ to: Website_FrequentQuestions });
    }

    const questionData = filteredData[0];
    const file = await getFrequentQuestion(
      questionData.docKey as FrequentQuestionKey,
      locale
    );
    const content = urlRenamer(file, locale);

    return { questionData, content, locale };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { questionData, locale } = loaderData;
    const path = questionData.relativeUrl;

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: `${questionData.title} | Intlayer` },
        { name: 'description', content: questionData.description },
        { name: 'keywords', content: questionData.keywords.join(', ') },
        { property: 'og:title', content: `${questionData.title} | Intlayer` },
        { property: 'og:description', content: questionData.description },
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
