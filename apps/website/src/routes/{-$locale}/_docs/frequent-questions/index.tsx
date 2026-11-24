import { Website_FrequentQuestions } from '@intlayer/design-system/routes';
import { buildFAQPageJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync } from 'intlayer';
import { ChevronRight } from 'lucide-react';
import { useIntlayer } from 'react-intlayer';
import { getFaqEntries } from '~/components/FaqPage/faqData';
import { FaqPageLayout } from '~/components/FaqPage/FaqPageLayout';
import { Link } from '~/components/Link/Link';
import { loadFaqIndex } from '~/serverFunctions/faq';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
} from '~/utils/structuredData';

export const Route = createFileRoute('/{-$locale}/_docs/frequent-questions/')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const [frequentQuestions, metadata, siteStructuredData] = await Promise.all(
      [
        loadFaqIndex({ data: { locale } }),
        getIntlayerAsync('frequent-questions-page', locale),
        getSiteStructuredData({ data: locale }),
      ]
    );
    return { locale, frequentQuestions, metadata, siteStructuredData };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale = defaultLocale } = params;
    const path = Website_FrequentQuestions;
    const { metadata, siteStructuredData } = loaderData;
    const { title, description, keywords } = metadata;

    const faqs = loaderData
      ? Object.values(
          (loaderData as any).frequentQuestions as Record<
            string,
            { title: string; description: string }
          >
        ).map((q) => ({ question: q.title, answer: q.description }))
      : [];

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : keywords || '',
        },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
      ],
      scripts: [
        ...getSiteStructuredDataScripts(siteStructuredData),
        {
          type: 'application/ld+json',
          children: JSON.stringify(buildFAQPageJsonLd({ faqs })),
        },
      ],
    };
  },
  component: FrequentQuestionsPage,
});

function FrequentQuestionsPage() {
  const { frequentQuestions, locale } = Route.useLoaderData();
  const { h1, description } = useIntlayer('frequent-questions-page');

  return (
    <FaqPageLayout
      faqRecord={frequentQuestions}
      locale={locale}
      displayAsideNavigation={false}
    >
      <header className="mt-6 mb-8 flex flex-col gap-2 px-4">
        <h1 className="text-2xl font-medium">{h1}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </header>
      <ul className="m-0 flex list-none flex-col divide-y divide-border/60 p-0">
        {getFaqEntries(frequentQuestions).map((frequentQuestion) => (
          <li key={frequentQuestion.docKey}>
            <Link
              to={frequentQuestion.url}
              label={frequentQuestion.title}
              variant="hoverable"
              color="neutral"
              className="flex flex-row items-center justify-between gap-4 rounded-lg px-4 py-4"
            >
              <span className="flex min-w-0 flex-col gap-1">
                <strong className="font-medium text-text">
                  {frequentQuestion.title}
                </strong>
                <span className="text-sm text-muted-foreground">
                  {frequentQuestion.description}
                </span>
              </span>
              <ChevronRight className="size-4 shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </FaqPageLayout>
  );
}
