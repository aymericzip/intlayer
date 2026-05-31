import { Container } from '@intlayer/design-system/container';
import { Website_FrequentQuestions } from '@intlayer/design-system/routes';
import { getFrequentQuestionMetadataRecord } from '@intlayer/docs';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { ArrowRight } from 'lucide-react';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { FAQPageHeader } from '~/structuredData/FAQPageHeader';

export const Route = createFileRoute('/{-$locale}/_docs/frequent-questions/')({
  loader: async ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const frequentQuestions = await getFrequentQuestionMetadataRecord(locale);
    return { locale, frequentQuestions };
  },
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_FrequentQuestions;
    const { title, description, keywords } = getIntlayer(
      'frequent-questions-page',
      locale
    );

    return {
      title: String(title),
      meta: [
        { name: 'description', content: String(description) },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : String(keywords || ''),
        },
        { property: 'og:url', content: getLocalizedUrl(path, locale) },
        { property: 'og:title', content: String(title) },
        { property: 'og:description', content: String(description) },
      ],
      links: [
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },
        { rel: 'alternate', hrefLang: 'x-default', href: path },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),
      ],
    };
  },
  component: FrequentQuestionsPage,
});

function FrequentQuestionsPageTitle() {
  const { h1 } = useIntlayer('frequent-questions-page');
  return <h1 className="font-bold text-2xl">{h1}</h1>;
}

function FrequentQuestionsPage() {
  const { frequentQuestions } = Route.useLoaderData();
  const frequentQuestionsList = Object.values(frequentQuestions);

  const faqs = frequentQuestionsList.map((q) => ({
    question: q.title,
    answer: q.description,
  }));

  return (
    <>
      <FAQPageHeader faqs={faqs} />
      <div className="m-auto flex max-w-2xl flex-col gap-10 p-10 text-center">
        <Suspense>
          <FrequentQuestionsPageTitle />
        </Suspense>
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
    </>
  );
}
