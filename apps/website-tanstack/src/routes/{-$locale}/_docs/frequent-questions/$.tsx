import { App_Home_Path } from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { CompositeComponent } from '@tanstack/react-start/rsc';
import { defaultLocale } from 'intlayer';
import { type FC, lazy, Suspense } from 'react';
import { loadFaqPage } from '~/serverFunctions/faq';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

const I18nBenchmarkLazy = lazy(() =>
  import('~/components/I18nBenchmark').then((mod) => ({
    default: mod.I18nBenchmark,
  }))
);

type FrameworkKey = Parameters<typeof I18nBenchmarkLazy>[0]['initialFramework'];

const I18nBenchmarkSlot: FC<{ framework?: FrameworkKey }> = ({ framework }) => (
  <Suspense>
    <I18nBenchmarkLazy initialFramework={framework} />
  </Suspense>
);

export const Route = createFileRoute('/{-$locale}/_docs/frequent-questions/$')({
  ssr: true,
  loader: async ({ params }) => {
    const locale = (params.locale as string) ?? defaultLocale;
    const slugsStr = (params as any)['*'] || '';
    const slugs = slugsStr ? slugsStr.split('/') : [];

    const result = await loadFaqPage({ data: { locale, slugs } });
    const { exactMatch, faqsData, content } = result;

    if (!exactMatch) {
      if (faqsData.length > 0) {
        throw redirect({
          to: faqsData[0].relativeUrl as any,
        });
      }
      throw redirect({ to: App_Home_Path as any });
    }

    return {
      faqContent: content!.faqContent,
      faqContentSrc: content!.faqContentSrc,
      frequentQuestionData: exactMatch,
      locale,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.frequentQuestionData) return {};
    const { frequentQuestionData, locale } = loaderData;
    const { title, description, keywords, url } = frequentQuestionData;

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
        ...getHreflangLinks(url),
      ],
    };
  },
  component: FrequentQuestionPage,
});

function FrequentQuestionPage() {
  const { faqContentSrc } = Route.useLoaderData();

  return (
    <CompositeComponent
      src={faqContentSrc}
      I18nBenchmarkComponent={I18nBenchmarkSlot}
    />
  );
}
