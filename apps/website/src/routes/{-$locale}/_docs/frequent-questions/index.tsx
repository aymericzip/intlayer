import { Container } from '@intlayer/design-system/container';
import { Website_FrequentQuestions } from '@intlayer/design-system/routes';
import { buildFAQPageJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync } from 'intlayer';
import { ArrowRight } from 'lucide-react';
import { useIntlayer } from 'react-intlayer';
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
    const frequentQuestions = await loadFaqIndex({ data: { locale } });
    return { locale, frequentQuestions };
  },
  head: async ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = Website_FrequentQuestions;
    const [{ title, description, keywords }, siteStructuredData] =
      await Promise.all([
        getIntlayerAsync('frequent-questions-page', locale),
        getSiteStructuredData(locale),
      ]);

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
  const { frequentQuestions } = Route.useLoaderData();
  const { h1 } = useIntlayer('frequent-questions-page');
  const frequentQuestionsList = Object.values(frequentQuestions);

  return (
    <div className="m-auto flex max-w-2xl flex-col gap-10 p-10 text-center">
      <h1 className="font-bold text-2xl">{h1}</h1>
      <div className="flex flex-col gap-4 text-left">
        {frequentQuestionsList.map((frequentQuestion) => (
          <Link
            key={frequentQuestion.docKey}
            to={frequentQuestion.url}
            label={frequentQuestion.title}
            variant="hoverable"
            color="neutral"
          >
            <Container className="flex flex-row items-center justify-between p-3">
              <div className="flex flex-col gap-2">
                <strong>{frequentQuestion.title}</strong>
                <p className="text-neutral text-sm">
                  {frequentQuestion.description}
                </p>
              </div>
              <ArrowRight />
            </Container>
          </Link>
        ))}
      </div>
    </div>
  );
}
